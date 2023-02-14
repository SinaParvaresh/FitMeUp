import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../lib/init-firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import FormCard from "../components/UI/FormCard";
import classes from "./Register.module.css";
import { Button, Flex, Group, LoadingOverlay, Text } from "@mantine/core";
import ErrorOutput from "../components/UI/ErrorOutput";
import { FloatingLabelInput } from "../components/UI/FloatingLabelInput";
import { Title } from "@mantine/core";
import { PasswordStrengthBar } from "../components/UI/PasswordStrengthBar";
import { useForm } from "@mantine/form";

const Register = () => {
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const [enteredConfirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [errorValidations, setErrorValidations] = useState({
    credentialError: false,
    emailExists: false,
    firebaseEmailError: false,
    shortFirstName: "",
    shortLastName: "",
    invalidEmail: "",
  });

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: (values) => {
      if (values.firstName.length < 2) {
        setErrorValidations((prev) => {
          return { ...prev, shortFirstName: "First name is too short" };
        });
        return { firstName: true };
      }

      if (values.lastName.length < 2) {
        setErrorValidations((prev) => {
          return { ...prev, shortLastName: "Last name is too short" };
        });
        return { lastName: true };
      }

      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        setErrorValidations((prev) => {
          return { ...prev, invalidEmail: "Invalid email" };
        });
        return { invalidEmail: true };
      }
    },
  });

  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString().replace(/\//g, "-");

  // Password validation
  useEffect(() => {
    const hasNumber = /\d/.test(form.values.password);
    const hasLowercase = /[a-z]/.test(form.values.password);
    const hasUppercase = /[A-Z]/.test(form.values.password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(form.values.password);

    if (
      form.values.password.length > 5 &&
      hasNumber &&
      hasLowercase &&
      hasUppercase &&
      hasSpecialCharacter &&
      form.values.confirmPassword === form.values.password
    ) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  }, [form, validPassword]);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (form.validate().hasErrors) {
      return;
    }

    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword);
      const userID = auth.currentUser.uid;

      // Create and add the personal info of the user to the database
      await setDoc(doc(db, "users", userID), {
        personal: {
          first: form.values.firstName,
          last: form.values.lastName,
          email: form.values.email,
        },
      });

      // Create a subcollection called dates
      const dateSubcollection = `users/${userID}/dates`;
      await setDoc(doc(db, dateSubcollection, currentDate), {
        meals: {},
        totalCalories: 0,
      });

      setErrorValidations({
        credentialError: false,
      });
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      let errorMessage = error.message;
      setErrorValidations({
        credentialError: true,
      });

      if (errorMessage.includes("email-already-in-use")) {
        setErrorValidations((prevState) => {
          return { ...prevState, emailExists: "This email is already in use" };
        });
      } else if (errorMessage.includes("invalid-email")) {
        setErrorValidations((prevState) => {
          return { ...prevState, firebaseEmailError: "Invalid email" };
        });
      }
    }

    setIsLoading(false);
  };

  const firstNameHandler = (event) => {
    form.setFieldValue("firstName", event.target.value.trim());
    setErrorValidations((prev) => {
      return { ...prev, shortFirstName: "" };
    });
  };

  const lastNameHandler = (event) => {
    form.setFieldValue("lastName", event.target.value.trim());
    setErrorValidations((prev) => {
      return { ...prev, shortLastName: "" };
    });
  };

  const emailHandler = (event) => {
    setEmail(event.target.value.trim());
    form.setFieldValue("email", event.target.value.trim());
    setErrorValidations((prev) => {
      return { ...prev, invalidEmail: "" };
    });
  };

  const passwordHandler = (event) => {
    form.setFieldValue("password", event.target.value);
    setPassword(event.target.value);
  };

  const confirmPasswordHandler = (event) => {
    form.setFieldValue("confirmPassword", event.target.value);
    setConfirmPassword(event.target.value);
  };

  return (
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
          validationCheck={errorValidations}
          error={errorValidations.shortFirstName}
        />
        <FloatingLabelInput
          type="lastName"
          label="Last Name"
          placeholder="Last Name"
          onChangeHandler={lastNameHandler}
          error={errorValidations.shortLastName}
        />
        <FloatingLabelInput
          type="email"
          label="Email"
          placeholder="Email"
          onChangeHandler={emailHandler}
          error={errorValidations.invalidEmail || errorValidations.emailExists || errorValidations.firebaseEmailError}
        />

        <PasswordStrengthBar
          value={enteredPassword}
          confirmPasswordValue={enteredConfirmPassword}
          onChangeHandler={passwordHandler}
          onConfirmPasswordHandler={confirmPasswordHandler}
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
  );
};

export default Register;
