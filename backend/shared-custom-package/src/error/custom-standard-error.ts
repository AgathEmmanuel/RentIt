export abstract class CustomStandardError extends Error {
  abstract httpStatusCode: number;

  // constructor is required whenever you extend a built in class
  constructor(message: string) {

    super(message);
    Object.setPrototypeOf(this, CustomStandardError.prototype);
  }

  abstract formatErrors(): { message: string; field?: string}[];
}


//throw new Error('Something bad happened')

// this error message will be printed out in server logs  
// so something equivalent to throw new Error would be nice 
// the super function achives  the same 
// so we just ensure a message: string is also available from it
