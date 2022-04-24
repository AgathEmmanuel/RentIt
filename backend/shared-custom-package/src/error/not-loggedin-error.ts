import { CustomStandardError } from "./custom-standard-error";

export class NotLoggedInError extends CustomStandardError {
  httpStatusCode = 401;

  constructor() {
    super('User Not Logged in ');
    Object.setPrototypeOf(this, NotLoggedInError.prototype);
  }
  formatErrors() {
    return [{ message:'User Not Logged in '}];
  }
}
