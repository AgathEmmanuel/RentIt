import { useState } from 'react';
import axios from 'axios';




export default () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const onSubmit = async event => {
      event.preventDefault(); // to make sure form does not try to submit itself in browser

      const response = await axios.post('/api/user/signup', { userEmail, userPassword});
      //console.log(userEmail,userPassword);
      console.log(response.data);

  };


  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
          <label>Email Address</label>
          <input value={userEmail} onChange={e => setUserEmail(e.target.value)} className="form-control" />
      </div>
      <div className="form-group">
          <label>Password</label>
          <input value={userPassword} onChange={e => setUserPassword(e.target.value)} type="password" className="form-control" />
      </div>
      <button className="btn btn-primary"> Sign up</button>
    </form>
  );
};
