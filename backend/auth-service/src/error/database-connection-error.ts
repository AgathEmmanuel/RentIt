import { ValidationError } from "express-validator";
export class DatabaseConnectonError extends Error {
  issue = 'Connection to database failed'
  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectonError.prototype);
  }
}
