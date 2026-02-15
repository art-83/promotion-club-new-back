interface NotificationPushMessageDTO {
  title: string;
  description: string;
  data: {
    promotion_id: string;
    store_id: string;
  }
}

export default NotificationPushMessageDTO;
