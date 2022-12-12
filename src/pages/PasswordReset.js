import React, { Fragment, useState } from "react";
import Card from "../components/UI/Card";
import Header from "../components/Layout/Header";
import classes from "./PasswordReset.module.css";
import Button from "../components/UI/Button";

const Register = () => {
  const [enteredEmail, setEmail] = useState("");

  const resetPasswordHandler = (event) => {
    event.preventDefault();

    setEmail(event.target.value);
  };

  return (
    <Fragment>
      <Header></Header>
      <Card>
        <label>Forgot Password?</label>
        <input
          type="email"
          placeholder="Email Address"
          className={classes.input}
          value={enteredEmail}
          onChange={resetPasswordHandler}
        />
        <Button type="submit" disabled={!enteredEmail}>
          Submit
        </Button>
      </Card>
    </Fragment>
  );
};

export default Register;
