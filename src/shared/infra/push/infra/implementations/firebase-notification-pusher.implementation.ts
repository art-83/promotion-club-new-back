import NotificationPusherProvider from "../providers/notification-pusher.provider";
import NotificationPushMessageDTO from "../../dtos/notification-push-message.dto";
import * as admin from "firebase-admin";
import * as fs from "fs";

class FirebaseNotificationPusher implements NotificationPusherProvider {
  private client: admin.messaging.Messaging;

  constructor() {
    this.client = this.initializeFirebaseSDK();
  }

  public async push(tokens: string[], data: Partial<NotificationPushMessageDTO>): Promise<void> {
    const notificationPayload = {
      tokens: tokens,
      notification: {
        title: data.title,
        body: data.description,
      },
      android: {
        priority: "high",
      },
      data: data.data,
    } as admin.messaging.MulticastMessage;

    const send = await this.client.sendEachForMulticast(notificationPayload);

    const success = send.responses
      .map((response, index) => ({ token: tokens[index], success: response.success }))
      .filter((item) => item.success)
      .map((item) => item.token);

    const errors = send.responses
      .map((response, index) => ({ token: tokens[index], success: response.success }))
      .filter((item) => !item.success)
      .map((item) => item.token);

    console.log(success, errors);
  }

  private initializeFirebaseSDK(): admin.messaging.Messaging {
    const firebaseCredentials = JSON.parse(
      String(fs.readFileSync(__dirname + "/../../../../../config/promotion-club-pusher-firebase-credentials.json"))
    );
    admin.initializeApp({
      credential: admin.credential.cert(firebaseCredentials),
    });
    return admin.messaging();
  }
}

export default FirebaseNotificationPusher;
