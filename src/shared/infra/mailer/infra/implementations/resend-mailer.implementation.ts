import EmailBodyDTO from "../../dtos/email-body.dto";
import MailerProvider from "../providers/mailer.provider";
import { Resend } from "resend";
import resendMailerConfig from "../../../../../config/resend.config";

class ResendMailer implements MailerProvider {
    private client: Resend;

    constructor() {
        this.client = new Resend(resendMailerConfig.apiKey);
    }

    public async send(emails: string[], emailBody: EmailBodyDTO): Promise<void> {
        const response = await this.client.emails.send({
            from: resendMailerConfig.from,
            to: emails,
            subject: emailBody.subject,
            html: emailBody.body,
        });
        console.log(`[ ${new Date().toISOString()} ] Email sent to Resend:`);
        console.log(response);
    }
}

export default ResendMailer;