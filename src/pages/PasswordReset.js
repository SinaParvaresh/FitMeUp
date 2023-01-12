import React, { Fragment, useState, useRef } from "react";
import FormCard from "../components/UI/FormCard";
import classes from "./PasswordReset.module.css";
import { Button, Center, Group, Stack, Text, Title } from "@mantine/core";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import { FloatingLabelInput } from "../components/UI/FloatingLabelInput";
import { IconArrowLeft } from "@tabler/icons";
import { Link } from "react-router-dom";

const Register = () => {
  const forgotPassRef = useRef();
  const [enteredEmail, setEmail] = useState("");
  const [emailFound, setEmailFound] = useState(true);
  const [emailSent, setEmailSent] = useState(false);

  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAb5ucDahLmDupsP3s5M2aSP3Hfczz-_OE";

  const resetPasswordHandler = async (event) => {
    event.preventDefault();

    try {
      const request = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: {
          "Content-Type": "applicaton/json",
        },
      });
      const response = await request.json();

      if (!response.error) {
        setEmailFound(true);
        setEmailSent(true);

        return;
      } else {
        let errorMessage = response.error.message;

        if (errorMessage === "EMAIL_NOT_FOUND") {
          setEmailFound(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Fragment>
      <HeaderMegaMenu></HeaderMegaMenu>
      <FormCard onSubmit={resetPasswordHandler}>
        <Stack align="center">
          {!emailSent && <Title order={3}>Forgot Password?</Title> && (
            <Text c="dimmed">Please enter the email address associated with your account.</Text>
          )}
        </Stack>

        {!emailFound && <span className={classes.failed}>Email not found</span>}
        {!emailSent && (
          <FloatingLabelInput
            type="email"
            placeholder="Email"
            label="Email"
            className={classes.input}
            value={enteredEmail}
            onChangeHandler={emailHandler}
            innerRef={forgotPassRef}
          />
        )}
        {emailSent && <span className={classes.success}>Password reset request sent! </span>}

        <Group position="apart">
          <Link to="/login" className={classes.link}>
            <Center inline>
              <IconArrowLeft stroke={1.5} size={20} />
              <Text ml={5}>Back to login page</Text>
            </Center>
          </Link>

          <Button type="submit" disabled={!enteredEmail || emailSent}>
            Submit
          </Button>
        </Group>
      </FormCard>
    </Fragment>
  );
};

export default Register;
