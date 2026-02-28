const jwtConfig = {
  secret: {
    default: String(process.env.JWT_SECRET),
    passwordReset: String(process.env.PASSWORD_RESET_JWT_SECRET),
  },
  algorithm: "HS256",
  expiresIn: {
    passwordReset: 300,
  },
};

export default jwtConfig;
