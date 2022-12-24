import React from "react";
import { Link } from "react-router-dom";
import classes from "./HeaderLoginButton.module.css";

const HeaderLoginButton = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={classes.button}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <Link className={classes.logIn} to="/login">
        Log in
      </Link>
    </button>
  );
};

export default HeaderLoginButton;
