interface NotificationPusherProvider {
    push(message: string): Promise<void>;
}

export default NotificationPusherProvider;