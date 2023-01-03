import React, { Fragment, useState } from "react";
import Card from "../components/UI/Card";
import Header from "../components/Layout/Header";
import classes from "./PasswordReset.module.css";
import Button from "../components/UI/Button";

const Register = () => {
  const [enteredEmail, setEmail] = useState("");
  const [emailFound, setEmailFound] = useState(true);
  const [emailSent, setEmailSent] = useState(false);

  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAb5ucDahLmDupsP3s5M2aSP3Hfczz-_OE";

  const resetPasswordHandler = async (event) => {
    event.preventDefault();

    try {
      const request = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: {
          "Content-Type": "applicaton/json",
        },
      });
      const response = await request.json();

      if (!response.error) {
        setEmailFound(true);
        setEmailSent(true);

        return;
      } else {
        let errorMessage = response.error.message;

        if (errorMessage === "EMAIL_NOT_FOUND") {
          setEmailFound(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
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
