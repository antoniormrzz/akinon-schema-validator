export class CheckError extends Error {
  constructor(
    public message: string,
    public jessyString: string,
    public found: any,
    public expected: any
  ) {
    super(message);
  }

  getDetails() {
    return {
      message: this.message,
      jessyString: this.jessyString,
      found: this.found,
      expected: this.expected,
    };
  }
}
