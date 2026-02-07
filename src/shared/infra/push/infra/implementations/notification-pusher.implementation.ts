import NotificationPusherProvider from "../providers/notification-pusher.provider";
import NotificationPushMessageDTO from "../../dtos/notification-push-message.dto";
import NotificationPushResponseDTO from "../../dtos/notification-push-response.dto";
import * as admin from "firebase-admin";
import * as fs from "fs";

class NotificationPusher implements NotificationPusherProvider {
  private client: admin.messaging.Messaging;

  constructor() {
    this.client = this.initializeFirebaseSDK();
  }

  public async push(tokens: string[], message: NotificationPushMessageDTO): Promise<NotificationPushResponseDTO> {
    const notificationPayload = {
      tokens: tokens,
      notification: {
        title: message.title,
        body: message.description,
      },
      android: {
        priority: "high",
      },
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

    const notificationPushResponse = {
      success,
      errors,
    } as NotificationPushResponseDTO;

    return notificationPushResponse;
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

export default NotificationPusher;
