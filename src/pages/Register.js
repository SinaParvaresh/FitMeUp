import React, { Fragment, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormCard from "../components/UI/FormCard";
import classes from "./Register.module.css";
import { Button, Center, Flex, Group } from "@mantine/core";
import ErrorOutput from "../components/UI/ErrorOutput";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import { FloatingLabelInput } from "../components/UI/FloatingLabelInput";
import { Title } from "@mantine/core";

const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [enteredFirstName, setFirstName] = useState("");
  const [enteredLastName, setLastName] = useState("");
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorValidations, setErrorValidations] = useState({
    credentialError: false,
    emailExists: false,
    missingEmail: false,
    weakPassword: false,
    missingPassword: false,
  });

  const navigate = useNavigate();
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAb5ucDahLmDupsP3s5M2aSP3Hfczz-_OE";

  const submitHandler = async (event) => {
    event.preventDefault();

    if (enteredFirstName.trim().length === 0 || enteredLastName.trim().length === 0) {
      console.log("ERROR IN VALIDATIONS");
      return;
    }

    setIsLoading(true);

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
        setErrorValidations({
          credentialError: false,
        });
        navigate("/login");
      } else {
        let errorMessage = response.error.message;
        setErrorValidations({
          credentialError: true,
        });

        if (errorMessage === "EMAIL_EXISTS") {
          setErrorValidations((prevState) => {
            return { ...prevState, emailExists: true };
          });
        } else if (errorMessage === "MISSING_EMAIL" || errorMessage === "INVALID_EMAIL") {
          setErrorValidations((prevState) => {
            return { ...prevState, missingEmail: true };
          });
        } else if (errorMessage.substring(0, errorMessage.indexOf(" ")) === "WEAK_PASSWORD") {
          setErrorValidations((prevState) => {
            return { ...prevState, weakPassword: true };
          });
        } else if (errorMessage === "MISSING_PASSWORD") {
          setErrorValidations((prevState) => {
            return { ...prevState, missingPassword: true };
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const firstNameHandler = (event) => {
    setFirstName(event.target.value.trim());
    console.log("First name: ");
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value.trim());
    console.log("Entered Last name: ", enteredLastName);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value.trim());
    console.log("Entered Email: ", enteredEmail);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    console.log("Entered Password: ", enteredPassword);
  };

  return (
    <Fragment>
      <HeaderMegaMenu />
      <Center>
        <FormCard onSubmit={submitHandler}>
          <Flex direction="column" justify="center" gap="xs">
            <Group position="center">
              <Title order={2}>Register</Title>
            </Group>
            <ErrorOutput validationCheck={errorValidations} />

            <FloatingLabelInput
              className={`${classes.input} ${enteredFirstName.trim().length === 0 && classes.invalid}`}
              type="firstName"
              label="First Name"
              placeholder="First Name"
              onChangeHandler={firstNameHandler}
              innerRef={firstNameRef}
            />
            <FloatingLabelInput
              type="lastName"
              label="Last Name"
              placeholder="Last Name"
              onChangeHandler={lastNameHandler}
              innerRef={lastNameRef}
            />
            <FloatingLabelInput
              className={`${classes.input} ${
                (errorValidations.emailExists || errorValidations.missingEmail) && classes.invalid
              }`}
              type="email"
              label="Email"
              placeholder="Email"
              onChangeHandler={emailHandler}
              innerRef={emailRef}
            />
            <FloatingLabelInput
              className={`${classes.input} ${
                (errorValidations.missingPassword || errorValidations.weakPassword) && classes.invalid
              }`}
              type="password"
              label="Password"
              placeholder="Password"
              onChangeHandler={passwordHandler}
              innerRef={passwordRef}
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
          </Flex>
        </FormCard>
      </Center>
    </Fragment>
  );
};

export default Register;
