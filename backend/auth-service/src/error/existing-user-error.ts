import { CustomStandardError } from "./custom-standard-error";

export class ExistingUserError extends CustomStandardError {
    httpStatusCode = 400;

    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, ExistingUserError.prototype);
    }
    formatErrors() { 
        return [{ message: this.message }];
    }
}