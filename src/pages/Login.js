import React, { Fragment, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import classes from "./Login.module.css";
import Card from "../components/UI/Card";
import AuthContext from "../components/store/auth-context";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";

const Login = (props) => {
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const [emailExists, setEmailExists] = useState(true);
  const [tooManyRequests, setTooManyRequests] = useState(false);
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAb5ucDahLmDupsP3s5M2aSP3Hfczz-_OE";

  const submitHandler = async (event) => {
    event.preventDefault();

    if (enteredEmail.trim().length === 0 || enteredPassword.trim().length < 6) {
      return;
    }

    // Reset states
    setIsLoading(true);
    setValidPassword(true);
    setEmailExists(true);
    setTooManyRequests(false);
    console.log(enteredEmail);
    console.log(enteredPassword);

    try {
      const request = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
      });

      const response = await request.json();
      setIsLoading(false);
      if (!response.error) {
        authCtx.login(response.idToken, Date.now() + response.expiresIn * 1000);
        navigate("/home-page");
      } else {
        let errorMessage = response.error.message;

        if (errorMessage === "EMAIL_NOT_FOUND") {
          setEmailExists(false);
        } else if (errorMessage === "INVALID_PASSWORD") {
          setValidPassword(false);
        } else if (errorMessage.substring(0, errorMessage.indexOf(" ")) === "TOO_MANY_ATTEMPTS_TRY_LATER") {
          setTooManyRequests(true);
        }
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const emailHandler = (event) => {
    setEmail(event.target.value.trim());
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Fragment>
      <HeaderMegaMenu />
      <Card onSubmit={submitHandler}>
        <h2>Login</h2>
        {!emailExists && <div className={classes.muiAlert}>The Email is not a valid Email address</div>}
        {!validPassword && <div className={classes.muiAlert}>Incorrect password</div>}
        {tooManyRequests && <div className={classes.muiAlert}>Too many requests. Please try again later.</div>}
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
        <Button type="submit" disabled={isLoading ? true : false}>
          Log In
        </Button>
        <div className={classes.signingActivity}>
          <Link className={classes.forgotPass} to="/forgot-password">
            Forgot Password?
          </Link>
          <Link className={classes.signUp} to="/register">
            Sign up
          </Link>
        </div>
      </Card>
    </Fragment>
  );
};

export default Login;
