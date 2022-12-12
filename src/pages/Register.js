import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/UI/Card";
import classes from "./Register.module.css";
import Button from "../components/UI/Button";
import Header from "../components/Layout/Header";

const Register = () => {
  const [enteredFirstName, setFirstName] = useState("");
  const [enteredLastName, setLastName] = useState("");
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      enteredFirstName.trim().length === 0 ||
      enteredLastName.trim().length === 0
    ) {
      return;
    }

    let personObj = {
      fname: enteredFirstName,
      lname: enteredLastName,
      email: enteredEmail,
      password: enteredPassword,
    };

    console.log(personObj);
  };

  const firstNameHandler = (event) => {
    console.log(enteredFirstName);
    setFirstName(event.target.value.trim());
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value.trim());
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
      <Card onSubmit={submitHandler}>
        <input
          className={classes.input}
          type="firstName"
          placeholder="First Name"
          onChange={firstNameHandler}
        />
        <input
          className={classes.input}
          type="lastName"
          placeholder="Last Name"
          onChange={lastNameHandler}
        />
        <input
          className={classes.input}
          type="email"
          placeholder="E-Mail"
          onChange={emailHandler}
        />
        <input
          className={classes.input}
          type="password"
          placeholder="Password"
          onChange={passwordHandler}
        />
        <Button type="submit">Sign Up</Button>
        <div className={classes.signIn}>
          Have an account?
          <Link className={classes.signInLink} to="/login">
            Sign in
          </Link>
        </div>
      </Card>
    </Fragment>
  );
};

export default Register;
