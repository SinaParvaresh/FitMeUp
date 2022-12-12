import React from "react";
import { Link } from "react-router-dom";
import classes from "./HeaderLoginButton.module.css";

const HeaderLoginButton = (props) => {
  return (
    <button className={classes.button}>
      <Link className={classes.logIn} to="/login">
        Log in
      </Link>
    </button>
  );
};

export default HeaderLoginButton;
