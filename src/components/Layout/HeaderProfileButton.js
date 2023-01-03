import React from "react";
import { Link } from "react-router-dom";
import classes from "./HeaderButton.module.css";

const HeaderProfileButton = (props) => {
  return (
    <Link className={classes.link} to="/user-profile">
      <button
        type={props.type || "button"}
        className={classes.button}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        Profile
      </button>
    </Link>
  );
};

export default HeaderProfileButton;
