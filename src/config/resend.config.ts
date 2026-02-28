const resendMailerConfig = {
  from: String(process.env.RESEND_FROM),
  apiKey: String(process.env.RESEND_API_KEY),
};

export default resendMailerConfig;
