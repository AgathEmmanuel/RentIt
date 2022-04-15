import { StandardErrorFormat } from "./errorInterface";

export class DatabaseConnectonError extends Error implements StandardErrorFormat{
  issue = 'Connection to database failed miserably'
  httpStatusCode = 500;

  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectonError.prototype);
  }

  formatErrors() {
      return [
          { message: this.issue }
      ]
  }

}
