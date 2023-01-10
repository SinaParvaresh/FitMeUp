import React from "react";
import classes from "./FormCard.module.css";

const Card = (props) => {
  return (
    <form onSubmit={props.onSubmit} className={`${classes.card} ${props.className}`}>
      {props.children}
    </form>
  );
};

export default Card;
