import NotificationPushMessageDTO from "../../dtos/notification-push-message.dto";
import NotificationPushResponseDTO from "../../dtos/notification-push-response.dto";

interface NotificationPusherProvider {
  push(tokens: string[], message: NotificationPushMessageDTO): Promise<NotificationPushResponseDTO>;
}

export default NotificationPusherProvider;
