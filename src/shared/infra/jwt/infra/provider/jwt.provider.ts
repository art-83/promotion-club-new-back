
interface JwtProvider <T> {
  generate(data: T): string;
  validate(token: string): T;
}

export default JwtProvider;
