import React, { Fragment, useState } from "react";
import Card from "../components/UI/Card";
import Header from "../components/Layout/Header";
import classes from "./PasswordReset.module.css";
import Button from "../components/UI/Button";

const Register = () => {
  const [enteredEmail, setEmail] = useState("");
  const [emailFound, setEmailFound] = useState(true);
  const [emailSent, setEmailSent] = useState(false);

  const resetPasswordHandler = (event) => {
    event.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAb5ucDahLmDupsP3s5M2aSP3Hfczz-_OE",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: {
          "Content-Type": "applicaton/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        setEmailFound(true);
        setEmailSent(true);
        //add success message
        return;
      } else {
        return res.json().then((data) => {
          if (data.error.message === "EMAIL_NOT_FOUND") {
            setEmailFound(false);
          }
        });
      }
    });
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Fragment>
      <Header></Header>
      <Card onSubmit={resetPasswordHandler}>
        {!emailFound && <span className={classes.failed}>Email not found</span>}
        {!emailSent && <label>Forgot Password?</label>}
        {!emailSent && (
          <input
            type="email"
            placeholder="Email Address"
            className={classes.input}
            value={enteredEmail}
            onChange={emailHandler}
          />
        )}
        {emailSent && <span className={classes.success}>Password reset request sent! </span>}
        <Button type="submit" disabled={!enteredEmail || emailSent}>
          Submit
        </Button>
      </Card>
    </Fragment>
  );
};

export default Register;
