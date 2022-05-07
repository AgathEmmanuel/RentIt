import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const apiurl = "http://localhost:1330/api/login";

  const loginUser = async (event) => {
    event.preventDefault();
    const response = await axios({
      method: "post",
      url: apiurl,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        userEmail,
        newPassword,
      }),
    });
    const data = await response.json();

    console.log(data);
    return data;
  };
  return (
    <div className="div_login">
      <h1>Login </h1>
      <div className="div_form_login">
        <form onSubmit={loginUser}>
          <h5>User-mail-id</h5>
          <input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="User Email ID"
            type="email"
          />

          <h5>Password</h5>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />

          <input type="submit" className="div_form_sign_up_btn" value="Login" />
        </form>
      </div>
    </div>
  );
};
export default Login;
