import NotificationPushMessageDTO from "../../dtos/notification-push-message.dto";

interface NotificationPusherProvider {
  push(tokens: string[], message: NotificationPushMessageDTO): Promise<void>;
}

export default NotificationPusherProvider;
