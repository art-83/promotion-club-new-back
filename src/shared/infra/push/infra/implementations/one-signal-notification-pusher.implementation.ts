import NotificationPushMessageDTO from "../../dtos/notification-push-message.dto";
import NotificationPushResponseDTO from "../../dtos/notification-push-response.dto";
import NotificationPusherProvider from "../providers/notification-pusher.provider";
import Onesignal from '@onesignal/node-onesignal';

class OneSignalNotificationPusher implements NotificationPusherProvider {
    private client: Onesignal.DefaultApi;

    constructor() {
        this.client = this.createOneSignalConfiguration();
    }

    async push(tokens: string[], message: NotificationPushMessageDTO): Promise<void> {
        const notification = new Onesignal.Notification();
        notification.app_id = String(process.env.ONESIGNAL_APP_ID);
        notification.headings = {
            en: message.title,
        };
        notification.contents = {
            en: message.description,
        };
        notification.data = message.data;
        notification.include_subscription_ids = tokens;
        const response = await this.client.createNotification(notification);
        console.log(`[ ${Date.now()} ] Notification pushed to OneSignal:`);
        console.log(JSON.stringify(response, null, 2));
    }

    private createOneSignalConfiguration(): Onesignal.DefaultApi {
        const configuration = Onesignal.createConfiguration({
            restApiKey: process.env.ONESIGNAL_API_KEY,
        });
        return new Onesignal.DefaultApi(configuration);
    }

}