import React from "react";
import classes from "./ErrorOutput.module.css";

const ErrorOutput = (props) => {
  return (
    <div>
      <div className={props.validationCheck.emailExists ? classes.muiAlert : classes.noAlert}>
        This Email address already exists
      </div>
      <div className={props.validationCheck.missingEmail ? classes.muiAlert : classes.noAlert}>
        Please enter a valid Email address
      </div>
      <div className={props.validationCheck.weakPassword ? classes.muiAlert : classes.noAlert}>
        Password should be at least 6 characters. Please try again
      </div>
      <div className={props.validationCheck.missingPassword ? classes.muiAlert : classes.noAlert}>
        Please enter a valid password
      </div>
    </div>
  );
};

export default React.memo(ErrorOutput);
