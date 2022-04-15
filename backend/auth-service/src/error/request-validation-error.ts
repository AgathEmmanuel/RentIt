import { ValidationError } from "express-validator";
import { StandardErrorFormat } from "./errorInterface";
export class RequestValidationError extends Error implements StandardErrorFormat{
  httpStatusCode = 400;
    constructor(public errors: ValidationError[]) {
        super();

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
  formatErrors() {
      return this.errors.map(err => {
          return { message: err.msg, field: err.param };
      })
  }
}