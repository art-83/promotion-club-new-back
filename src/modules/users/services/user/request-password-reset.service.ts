import { inject, injectable } from "tsyringe";
import PasswordResetCache from "../../infra/cache/implementation/password-reset-cache.implementation";
import MailerProvider from "../../../../shared/infra/mailer/infra/providers/mailer.provider";
import HashProvider from "../../../../shared/infra/hash/infra/providers/hash.provider";
import crypto from "crypto";
import resendMailerConfig from "../../../../config/resend.config";
import EmailBodyDTO from "../../../../shared/infra/mailer/dtos/email-body.dto";
import { passwordResetEmailHtmlTemplate } from "../../../../shared/infra/mailer/utils/password-reset";

@injectable()
class RequestPasswordResetService {
  constructor(
    @inject("Mailer")
    private mailer: MailerProvider,
    @inject("PasswordResetCache")
    private passwordResetCache: PasswordResetCache
  ) {}

  public async execute(email: string) {
    const code = this.generateCode();
    const passwordReset = await this.passwordResetCache.create({ email, code });
    const emailBody = {
      subject: `Código de redefinição de senha: ${code}.`,
      preheader: "Finalize a redefinição da sua senha agora.",
      body: passwordResetEmailHtmlTemplate(code),
    } as EmailBodyDTO;
    await this.mailer.send([email], emailBody);
    return { message: "Password reset email sent successfully!" };
  }

  private generateCode(): string {
    const code = crypto.randomInt(100, 999).toString() + crypto.randomInt(100, 999).toString();
    return code;
  }
}

export default RequestPasswordResetService;
