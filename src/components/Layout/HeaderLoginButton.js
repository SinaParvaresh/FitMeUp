import React from "react";
import { Link } from "react-router-dom";
import classes from "./HeaderButton.module.css";

const HeaderLoginButton = (props) => {
  return (
    <Link className={classes.link} to="/login">
      <button
        type={props.type || "button"}
        className={classes.button}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        Log in
      </button>
    </Link>
  );
};

export default HeaderLoginButton;
