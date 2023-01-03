import React from "react";
import { Link } from "react-router-dom";
import classes from "./HeaderButton.module.css";

const HeaderLogoutButton = (props) => {
  return (
    <Link className={classes.link} to="/login">
      <button
        type={props.type || "button"}
        className={classes.button}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        Log Out
      </button>
    </Link>
  );
};

export default HeaderLogoutButton;
