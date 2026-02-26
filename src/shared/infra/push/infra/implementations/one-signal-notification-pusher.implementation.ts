import NotificationPushMessageDTO from "../../dtos/notification-push-message.dto";
import NotificationPusherProvider from "../providers/notification-pusher.provider";
import { createConfiguration, DefaultApi, Notification } from '@onesignal/node-onesignal';

class OneSignalNotificationPusher implements NotificationPusherProvider {
    private client: DefaultApi;

    constructor() {
        this.client = this.createOneSignalConfiguration();
    }

    async push(tokens: string[], message: NotificationPushMessageDTO): Promise<void> {
        const notification = new Notification();
        notification.headings = {
            en: message.title,
        };
        notification.contents = {
            en: message.description,
        };
        notification.data = message.data;
        notification.include_subscription_ids = tokens;
        const response = await this.client.createNotification(notification);
        console.log(response.errors);
    }

    private createOneSignalConfiguration(): DefaultApi {
        const configuration = createConfiguration({
            restApiKey: process.env.ONESIGNAL_API_KEY,
            organizationApiKey: process.env.ONESIGNAL_ORGANIZATION_API_KEY,
        });
        return new DefaultApi(configuration);
    }
}

export default OneSignalNotificationPusher;