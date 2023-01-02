import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/UI/Card";
import classes from "./Register.module.css";
import Button from "../components/UI/Button";
import Header from "../components/Layout/Header";
import ErrorOutput from "../components/UI/ErrorOutput";

const Register = () => {
  const [enteredFirstName, setFirstName] = useState("");
  const [enteredLastName, setLastName] = useState("");
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [credentialError, setCredentialError] = useState(false);
  // const [emailExists, setEmailExists] = useState(false);
  // const [missingEmail, setMissingEmail] = useState(false);
  // const [weakPassword, setWeakPassword] = useState(false);
  // const [missingPassword, setMissingPassword] = useState(false);

  const [errorValidations, setErrorValidations] = useState({
    credentialError: false,
    emailExists: false,
    missingEmail: false,
    weakPassword: false,
    missingPassword: false,
  });

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    if (enteredFirstName.trim().length === 0 || enteredLastName.trim().length === 0) {
      console.log("ERROR IN VALIDATIONS");
      return;
    }

    setIsLoading(true);

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAb5ucDahLmDupsP3s5M2aSP3Hfczz-_OE", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      setIsLoading(false);
      // setEmailExists(false);
      // setWeakPassword(false);
      // setMissingEmail(false);
      // setMissingPassword(false);

      if (res.ok) {
        // setCredentialError(false);
        setErrorValidations({
          credentialError: false,
        });

        navigate("/login");
      } else {
        return res.json().then((data) => {
          let errorMessage = data.error.message;
          console.log(data.error.message);

          // setCredentialError(true);

          setErrorValidations({
            credentialError: true,
          });

          if (errorMessage === "EMAIL_EXISTS") {
            // setEmailExists(true);

            setErrorValidations((prevState) => {
              return { ...prevState, emailExists: true };
            });
          } else if (errorMessage === "MISSING_EMAIL" || errorMessage === "INVALID_EMAIL") {
            // setMissingEmail(true);
            setErrorValidations((prevState) => {
              return { ...prevState, missingEmail: true };
            });
          } else if (errorMessage.substring(0, errorMessage.indexOf(" ")) === "WEAK_PASSWORD") {
            // setWeakPassword(true);
            setErrorValidations((prevState) => {
              return { ...prevState, weakPassword: true };
            });
          } else if (errorMessage === "MISSING_PASSWORD") {
            // setMissingPassword(true);
            setErrorValidations((prevState) => {
              return { ...prevState, missingPassword: true };
            });
          }
        });
      }
    });
  };

  const firstNameHandler = (event) => {
    setFirstName(event.target.value.trim());
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value.trim());
    console.log("Entered Last name:", enteredLastName);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value.trim());
    console.log("Entered Email:", enteredEmail);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    console.log("Entered Password:", enteredPassword);
  };

  return (
    <Fragment>
      <Header></Header>
      <Card onSubmit={submitHandler}>
        <ErrorOutput validationCheck={errorValidations} />
        {enteredFirstName.trim().length === 0 && <span>invalid name</span>}
        <input
          className={`${classes.input} ${enteredFirstName.trim().length === 0 && classes.invalid}`}
          type="firstName"
          placeholder="First Name"
          onChange={firstNameHandler}
        />
        <input className={classes.input} type="lastName" placeholder="Last Name" onChange={lastNameHandler} />
        <input
          className={`${classes.input} ${
            (errorValidations.emailExists || errorValidations.missingEmail) && classes.invalid
          }`}
          type="email"
          placeholder="E-Mail"
          onChange={emailHandler}
        />
        <input
          className={`${classes.input} ${
            (errorValidations.missingPassword || errorValidations.weakPassword) && classes.invalid
          }`}
          type="password"
          placeholder="Password"
          onChange={passwordHandler}
        />
        <Button type="submit" disabled={isLoading ? true : false}>
          Sign Up
        </Button>
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
