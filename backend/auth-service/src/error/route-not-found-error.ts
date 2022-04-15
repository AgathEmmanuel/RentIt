import { CustomStandardError } from "./custom-standard-error";

export class routeNotFoundError extends CustomStandardError {
    httpStatusCode = 404;

    constructor() {
        super('Route do not exist');
        Object.setPrototypeOf(this, routeNotFoundError.prototype)
    }
    formatErrors() { 
        return [{ message: "Route not found" }];
    }


}