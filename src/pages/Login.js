import React, { Fragment, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Flex, Group, Text } from "@mantine/core";
import classes from "./Login.module.css";
import FormCard from "../components/UI/FormCard";
import AuthContext from "../components/store/auth-context";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import { FloatingLabelInput } from "../components/UI/FloatingLabelInput";
import { Title } from "@mantine/core";
import { FloatingPasswordInput } from "../components/UI/FloatingPasswordInput";

const Login = (props) => {
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const [emailExists, setEmailExists] = useState(true);
  const [tooManyRequests, setTooManyRequests] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAb5ucDahLmDupsP3s5M2aSP3Hfczz-_OE";

  const submitHandler = async (event) => {
    event.preventDefault();

    if (enteredEmail.trim().length === 0 || enteredPassword.trim().length < 6) {
      console.log("Email or Password is too short!");
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

      <FormCard onSubmit={submitHandler}>
        <Flex direction="column" gap="xs">
          <Group position="center">
            <Title order={2}>Login</Title>
          </Group>

          {!emailExists && <div className={classes.muiAlert}>The Email is not a valid Email address</div>}
          {!validPassword && <div className={classes.muiAlert}>Incorrect password</div>}
          {tooManyRequests && <div className={classes.muiAlert}>Too many requests. Please try again later.</div>}

          <FloatingLabelInput
            type="email"
            placeholder="Email"
            label="Email"
            onChangeHandler={emailHandler}
            innerRef={emailRef}
          />

          <FloatingPasswordInput
            placeholder="Password"
            label="Password"
            onChangeHandler={passwordHandler}
            innerRef={passwordRef}
          />

          <Button type="submit" disabled={isLoading ? true : false}>
            Log In
          </Button>

          <Group position="apart">
            <Link to="/forgot-password" className={classes.link}>
              <Text weight={600}>Forgot Password?</Text>
            </Link>
            <Link to="/register" className={classes.link}>
              <Text weight={600}>Sign up</Text>
            </Link>
          </Group>
        </Flex>
      </FormCard>
    </Fragment>
  );
};

export default Login;
