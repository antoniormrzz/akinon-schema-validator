export class CheckError extends Error {
  constructor(
    public message: string,
    public jessyString: string,
    public found: any,
    public expected: any
  ) {
    super(message);
  }
}
