const jwtConfig = {
  secret: String(process.env.JWT_SECRET),
  algorithm: "HS256",
};

export default jwtConfig;
