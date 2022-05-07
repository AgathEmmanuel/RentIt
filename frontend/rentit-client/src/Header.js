import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">

      <div className="header_name">
          <Link to="/home">
            <button className="btn_options">RentIt</button>
          </Link>
          </div>

      <div className="header_options">
        <div className="header_option1">
          <Link to="/product">
            <button className="btn_options">RentOut</button>
          </Link>
        </div>
        <div className="header_option2">
          <Link to="/login">
            <button className="btn_options">SignIn</button>
          </Link>
        </div>
        <div className="header_option3">
          <Link to="/signup">
            <button className="btn_options">SignUp</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
