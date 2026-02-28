import EmailBodyDTO from "../../dtos/email-body.dto";

interface MailerProvider {
  send(emails: string[], emailBody: EmailBodyDTO): Promise<void>;
}

export default MailerProvider;