import { useState } from 'react';
//import axios from 'axios';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';




export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [errors, setErrors] = useState([]);
  const { doRequest, errors } = useRequest({
    url: '/api/user/signup',
    method: 'post',
    body: {
      email,password
    },
    onSuccesfullLogin: () => Router.push('/')
    // a callback that will be invoked anytime we make a callback successfully
  });


  const onSubmit = async event => {
      event.preventDefault(); // to make sure form does not try to submit itself in browser


      {/*

      try {
      const response = await axios.post('/api/user/signup', { email, password});
      //console.log(email,password);
      console.log(response.data);
  } catch (err) {
    console.log(err.response.data);
    setErrors(err.response.data.errors);
     }

    */}

    // Router.push('/');
    // doRequest();
    // we need to make sure user get navigated to home page only if login was succesful

    await doRequest();
    // no error is going to surface back on in here since we catch the error in userRequest hook

    // Another approach is to add in an additional argument to a useRequest hook
    // something like a callback function that gets invoked anytime we make a request successfully
    
    // Router.push('/');


  };
  


  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Upp</h1>
      <div className="form-group">
          <label>Email Address</label>
          <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
      </div>
      <div className="form-group">
          <label>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
      </div>

      {/*
      {errors.length >0 && (
      <div className="alert alert-danger">
        <h4>Something went wrong..</h4>
        <ul className="my-0">
        {errors.map(err => ( <li key={err.message}>{err.message}</li> ))}
        </ul>
      </div>
      )}
      */}
      {errors}


      <button className="btn btn-primary"> Sign up</button>
    </form>
  );
};
