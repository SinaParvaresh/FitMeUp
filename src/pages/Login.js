import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../lib/init-firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, createStyles, Flex, Group, LoadingOverlay, Text } from "@mantine/core";
import FormCard from "../components/UI/FormCard";
import AuthContext from "../components/store/auth-context";
import { FloatingLabelInput } from "../components/UI/FloatingLabelInput";
import { Title } from "@mantine/core";
import { FloatingPasswordInput } from "../components/UI/FloatingPasswordInput";
import { useForm } from "@mantine/form";

const useStyles = createStyles(() => ({
  link: {
    textDecoration: "none",
  },

  subTextLink: {
    fontWeight: 600,
    "&:hover": {
      textDecorationLine: "underline",
    },
  },
}));

const Login = () => {
  const [enteredEmail, setEmail] = useState("");
  const [enteredPassword, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tooManyRequests, setTooManyRequests] = useState(false);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { classes } = useStyles();

  const [errorValidations, setErrorValidations] = useState({
    invalidEmail: "",
    invalidPassword: "",
    emailExist: "",
    incorrectPassword: "",
  });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values) => {
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        setErrorValidations((prev) => {
          return { ...prev, invalidEmail: "Invalid email format" };
        });
        return { email: true };
      }

      if (values.password.length < 6) {
        setErrorValidations((prev) => {
          return { ...prev, invalidPassword: "Please enter a valid password" };
        });
        return { password: true };
      }
    },
  });

  const submitHandler = async (event) => {
    event.preventDefault();

    if (form.validate().hasErrors) {
      return;
    }

    // Reset states
    setIsLoading(true);
    setTooManyRequests(false);

    try {
      await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
      const userID = auth.currentUser.uid;
      authCtx.login(auth.currentUser.getIdToken(), Date.now() + 3600 * 1000, userID);
      navigate("/home-page");
    } catch (error) {
      let errorMessage = error.message;

      if (errorMessage.includes("auth/user-not-found")) {
        setErrorValidations((prev) => {
          return { ...prev, emailExist: "Invalid email or password", incorrectPassword: "Invalid email or password" };
        });
      } else if (errorMessage.includes("auth/wrong-password")) {
        setErrorValidations((prev) => {
          return { ...prev, emailExist: "Invalid email or password", incorrectPassword: "Invalid email or password" };
        });
      } else if (errorMessage.includes("to many failed login attempts")) {
        setTooManyRequests(true);
      }
    }
    setIsLoading(false);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value.trim());
    form.setFieldValue("email", event.target.value.trim());
    setErrorValidations((prev) => {
      return { ...prev, invalidEmail: "", emailExist: "" };
    });
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
    form.setFieldValue("password", event.target.value);
    setErrorValidations((prev) => {
      return { ...prev, invalidPassword: "", incorrectPassword: "" };
    });
  };

  return (
    <FormCard onSubmit={submitHandler}>
      <Flex direction="column" gap="xs">
        <Group position="center">
          <Title order={2}>Login</Title>
        </Group>

        {tooManyRequests && (
          <Text c="#e03131" size="sm" pb="md">
            Access to this account has been temporarily disabled due to many failed login attempts. You can immediately
            restore it by resetting your password or you can try again later.
          </Text>
        )}

        <FloatingLabelInput
          type="email"
          placeholder="Email"
          label="Email"
          onChangeHandler={emailHandler}
          error={tooManyRequests || errorValidations.emailExist || errorValidations.invalidEmail}
        />

        <FloatingPasswordInput
          placeholder="Password"
          label="Password"
          onChangeHandler={passwordHandler}
          error={tooManyRequests || errorValidations.incorrectPassword || errorValidations.invalidPassword}
        />

        <Button type="submit" disabled={isLoading ? true : false}>
          <LoadingOverlay visible={isLoading} overlayBlur={1} loaderProps={{ variant: "dots" }} />
          Log In
        </Button>

        <Group position="apart">
          <Link to="/forgot-password" className={classes.link}>
            <Text className={classes.subTextLink}>Forgot Password?</Text>
          </Link>
          <Link to="/register" className={classes.link}>
            <Text className={classes.subTextLink}>Sign up</Text>
          </Link>
        </Group>
      </Flex>
    </FormCard>
  );
};

export default Login;
