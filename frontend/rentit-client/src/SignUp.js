import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";

const SignUp = () => {
  const [userEmail, setUserEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const apiurl = "http://localhost:1330/api/signup";

  const signupUser = async (event) => {
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
    <div className="div_signup">
      <h1>Signup </h1>
      <div className="div_form_signup">
        <form onSubmit={signupUser}>
          <h5>User-mail-id</h5>
          <input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="User Email ID"
            type="email"
          />

          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />

          <input
            type="submit"
            className="div_form_sign_up_btn"
            value="Sign Up"
          />
        </form>
        <p>
          By Signing up you are agreeing to our
          Terms and conditions
        </p>
      </div>
    </div>
  );
};

export default SignUp;
