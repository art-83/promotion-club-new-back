import NotificationPushMessageDTO from "../../dtos/notification-push-message.dto";
import NotificationPusherProvider from "../providers/notification-pusher.provider";
import { createConfiguration, DefaultApi, Notification } from "@onesignal/node-onesignal";
import oneSignalConfig from "../../../../../config/one-signal.config";

class OneSignalNotificationPusher implements NotificationPusherProvider {
  private client: DefaultApi;

  constructor() {
    this.client = this.createOneSignalConfiguration();
  }

  async push(tokens: string[], message: NotificationPushMessageDTO): Promise<void> {
    const notification = new Notification();
    notification.app_id = oneSignalConfig.appId;
    notification.headings = {
      en: message.title,
    };
    notification.contents = {
      en: message.description,
    };
    notification.data = message.data;
    notification.include_subscription_ids = tokens;
    const response = await this.client.createNotification(notification);
    console.log(`[ ${new Date().toISOString()} ] Notification pushed to OneSignal:`);
    console.log(`Notification: ${JSON.stringify(notification, null, 2)}`);
    console.log(`Response: ${JSON.stringify(response, null, 2)}`);
  }

  private createOneSignalConfiguration(): DefaultApi {
    const configuration = createConfiguration({
      restApiKey: oneSignalConfig.apiKey,
    });
    return new DefaultApi(configuration);
  }
}

export default OneSignalNotificationPusher;
