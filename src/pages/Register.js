import React, { Fragment, useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../lib/init-firebase";
import { doc, setDoc } from "firebase/firestore";
import AuthContext from "../components/store/auth-context";
import FormCard from "../components/UI/FormCard";
import classes from "./Register.module.css";
import { Button, Flex, Group, LoadingOverlay, Text } from "@mantine/core";
import ErrorOutput from "../components/UI/ErrorOutput";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import { FloatingLabelInput } from "../components/UI/FloatingLabelInput";
import { Title } from "@mantine/core";
import { PasswordStrengthBar } from "../components/UI/PasswordStrengthBar";

const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const [enteredFirstName, setFirstName] = useState("");
  const [enteredLastName, setLastName] = useState("");
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const [enteredConfirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const [errorValidations, setErrorValidations] = useState({
    credentialError: false,
    emailExists: false,
    missingEmail: false,
    weakPassword: false,
    missingPassword: false,
  });

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAb5ucDahLmDupsP3s5M2aSP3Hfczz-_OE";
  const currentDate = new Date().toLocaleDateString().replace(/\//g, "-");

  useEffect(() => {
    const hasNumber = /\d/.test(enteredPassword);
    const hasLowercase = /[a-z]/.test(enteredPassword);
    const hasUppercase = /[A-Z]/.test(enteredPassword);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(enteredPassword);

    if (
      enteredPassword.length > 5 &&
      hasNumber &&
      hasLowercase &&
      hasUppercase &&
      hasSpecialCharacter &&
      enteredConfirmPassword === enteredPassword
    ) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  }, [enteredPassword, enteredConfirmPassword, validPassword]);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (enteredFirstName.trim().length === 0 || enteredLastName.trim().length === 0) {
      console.log("ERROR IN VALIDATIONS");
      return;
    }

    // Move to the top of submitHandler?
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
        authCtx.localId = response.localId;
        console.log("Auth ctx in register page: ", authCtx);

        // Create and add the personal info of the user to the database
        await setDoc(doc(db, "users", authCtx.localId), {
          personal: {
            first: enteredFirstName,
            last: enteredLastName,
            email: enteredEmail,
          },
        });

        // Create a subcollection called dates
        const dateSubcollection = `users/${authCtx.localId}/dates`;
        await setDoc(doc(db, dateSubcollection, currentDate), {
          meals: {},
          totalCalories: 0,
        });

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
            //del
            return { ...prevState, weakPassword: true };
          });
        } else if (errorMessage === "MISSING_PASSWORD") {
          setErrorValidations((prevState) => {
            //del
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
    // console.log("First name: ", enteredFirstName);
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value.trim());
    // console.log("Entered Last name: ", enteredLastName);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value.trim());
    // console.log("Entered Email: ", enteredEmail);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <Fragment>
      <HeaderMegaMenu />
      <FormCard onSubmit={submitHandler}>
        <Flex direction="column" justify="center" gap="xs">
          <Group position="center">
            <Title order={2}>Register</Title>
          </Group>
          <ErrorOutput validationCheck={errorValidations} />

          <FloatingLabelInput
            type="firstName"
            label="First Name"
            placeholder="First Name"
            onChangeHandler={firstNameHandler}
            innerRef={firstNameRef}
            validationCheck={errorValidations}
          />
          <FloatingLabelInput
            type="lastName"
            label="Last Name"
            placeholder="Last Name"
            onChangeHandler={lastNameHandler}
            innerRef={lastNameRef}
          />
          <FloatingLabelInput
            type="email"
            label="Email"
            placeholder="Email"
            onChangeHandler={emailHandler}
            innerRef={emailRef}
          />

          <PasswordStrengthBar
            value={enteredPassword}
            confirmPasswordValue={enteredConfirmPassword}
            onChangeHandler={passwordHandler}
            onConfrimPasswordHandler={confirmPasswordHandler}
          />

          <Button type="submit" disabled={isLoading || !validPassword ? true : false}>
            <LoadingOverlay visible={isLoading} overlayBlur={1} loaderProps={{ variant: "dots" }} />
            Sign Up
          </Button>

          <Group position="center" spacing="xs">
            <Text>Have an account?</Text>
            <Link className={classes.signInLink} to="/login">
              <Text weight={600}>Sign In</Text>
            </Link>
          </Group>
        </Flex>
      </FormCard>
    </Fragment>
  );
};

export default Register;
