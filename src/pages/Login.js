import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import Header from "../components/Layout/Header";
import classes from "./Login.module.css";

const Login = (props) => {
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0
    ) {
      return;
    } else if (!enteredEmail.includes("@")) {
      return;
    }

    setPassword("");
    console.log(enteredEmail);
    console.log(enteredPassword);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value.trim());
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Fragment>
      <Header></Header>
      <form className={classes.Login} onSubmit={submitHandler}>
        <input
          className={classes.input}
          value={enteredEmail}
          onChange={emailHandler}
          type="email"
          placeholder="E-mail.com"
        />
        <input
          className={classes.input}
          value={enteredPassword}
          onChange={passwordHandler}
          type="password"
          placeholder="Password"
        />
        <Button type="submit">Log In</Button>
        <div className={classes.signingActivity}>
          <Link className={classes.forgotPass} to="/password/reset">
            Forgot Password?
          </Link>
          <Link className={classes.signUp} to="/register">
            Sign up
          </Link>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
