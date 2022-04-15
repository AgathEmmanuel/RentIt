import { Request, Response, NextFunction } from "express";
import { CustomStandardError } from "../error/custom-standard-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // a common  response structure
  // all error responses send from any server should have this same structure
  // { errors: { message: string, field?:string }[] }

  
  if (err instanceof CustomStandardError) {
      return res.status(err.httpStatusCode).send({errors: err.formatErrors()});
  }

  console.log(err)

  /*
  if (err instanceof RequestValidationError) {
      return res.status(err.httpStatusCode).send({ errors: err.formatErrors() });
  */
      /*
      const formattedErrors = err.errors.map(error => {
          return { message: error.msg, field: error.param }
      });
      return res.status(400).send({ errors: formattedErrors });
      */

      //console.log("errror is handled as RequestValidation error")
  //}

  /*
  if (err instanceof DatabaseConnectonError) {
      return res.status(err.httpStatusCode).send({ errors: err.formatErrors()
        });
      //console.log("errror is handled as DB connection error")
  }
  */


  //console.log("error-handler Error loggggggg ", err);
  res.status(400).send({
    errors: [{ message: 'Somethin went wronggggggggg'}]
    //message: err.message

    //message: "error-handler constant Errorr",
  });
};


/*

CustomStandardError Abstract Class
-> this error structure standard should be followed by all servers  
-> this will extend the properties of built in error class

about Abstact Classes
- cannot be instantiated
- can be used to set requirements for subclasses  
- create a class when tanslated to JS, which allows 'instanceof' checks

*/