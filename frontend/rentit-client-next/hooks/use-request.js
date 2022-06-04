import axios from "axios";
import { useState } from "react";


export default ({ url, method, body, onSuccesfullLogin }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const response = await axios[method](url,body);


            if (onSuccesfullLogin) {
                onSuccesfullLogin(response.data);
                // just calling response.data  just if we need it in future
            }


            return response.data;

        } catch (err) {
            setErrors(

      <div className="alert alert-danger">
        <h4>Something went wrong..</h4>
        <ul className="my-0">
        {err.response.data.errors.map((err) => ( <li key={err.message}>{err.message}</li> ))}
        </ul>
      </div>

            );

        // throw err;
        // we are rethrowing the error so that it can be used by routes in signup page as a signal to 
        // route to home page even though we catch it here

        // we need not use throw err since we are now using onSuccesfullLogin callback 



        }
    };
    return { doRequest, errors}
}
