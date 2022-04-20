import { CustomStandardError } from "./custom-standard-error";

export class DatabaseConnectonError extends CustomStandardError {
  issue = 'Connection to database failed miserably'
  httpStatusCode = 500;

  constructor() {
    super('Connection to DB failed');
    Object.setPrototypeOf(this, DatabaseConnectonError.prototype);
  }

  formatErrors() {
      return [
          { message: this.issue }
      ]
  }


}
