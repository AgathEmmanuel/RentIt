import { CustomStandardError } from "./custom-standard-error";
import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomStandardError {
  httpStatusCode = 400;
    constructor(public errors: ValidationError[]) {
        super('Requsted parameters are invalid');

        Object.setPrototypeOf(this, RequestValidationError.prototype);

    }
  formatErrors() {
      return this.errors.map(err => {
          return { message: err.msg, field: err.param };
      })
  }
}