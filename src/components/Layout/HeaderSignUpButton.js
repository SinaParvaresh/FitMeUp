import React from "react";
import { Link } from "react-router-dom";
import classes from "./HeaderButton.module.css";

const HeaderSignUpButton = (props) => {
  return (
    <Link className={classes.link} to="/register">
      <button
        type={props.type || "button"}
        className={classes.button}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        Sign Up
      </button>
    </Link>
  );
};

export default HeaderSignUpButton;
