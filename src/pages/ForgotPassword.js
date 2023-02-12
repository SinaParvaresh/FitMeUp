import React, { Fragment, useState, useRef } from "react";
import { auth } from "../lib/init-firebase";
import FormCard from "../components/UI/FormCard";
import { Button, Center, Group, Stack, Text, Title } from "@mantine/core";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import { FloatingLabelInput } from "../components/UI/FloatingLabelInput";
import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { cleanNotifications, showNotification, updateNotification } from "@mantine/notifications";

const ForgotPassword = () => {
  const forgotPassRef = useRef();
  const [enteredEmail, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const resetPasswordHandler = async (event) => {
    event.preventDefault();
    cleanNotifications();
    setIsSendingRequest(true);

    if (!emailRegex.test(enteredEmail)) {
      setIsSendingRequest(false);
      return showNotification({
        color: "red",
        title: "Invalid email",
        message: "Please check the format of your entered email",
        autoClose: 5000,
        icon: <IconX size={16} />,
      });
    }

    showNotification({
      id: "send-email",
      loading: true,
      title: "Sending email request",
      message: "Please wait...",
      autoClose: false,
      disallowClose: true,
    });

    try {
      await sendPasswordResetEmail(auth, enteredEmail);
      updateNotification({
        id: "send-email",
        color: "teal",
        title: "Email Sent",
        message: "Please check your email to reset your password",
        autoClose: 5000,
        icon: <IconCheck size={16} />,
      });
      setEmailSent(true);
    } catch (error) {
      console.log(error);
      const message = error.message;
      if (message.includes("user-not-found")) {
        updateNotification({
          id: "send-email",
          color: "red",
          title: "This email does not exit",
          message: "Please enter a valid email address",
          autoClose: 5000,
          icon: <IconX size={16} />,
        });
      } else if (message.includes("invalid-email")) {
        updateNotification({
          id: "send-email",
          color: "red",
          title: "Invalid email",
          message: "Please check the format of your entered email",
          autoClose: 5000,
          icon: <IconX size={16} />,
        });
      }
      setIsSendingRequest(false);
    }
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Fragment>
      <HeaderMegaMenu></HeaderMegaMenu>
      <FormCard onSubmit={resetPasswordHandler}>
        <Stack align="center" pb="1rem">
          <Title order={3}>Forgot Password?</Title>
          <Text c="dimmed">Please enter the email address associated with your account.</Text>
        </Stack>

        {!emailSent && (
          <FloatingLabelInput
            placeholder="Email"
            label="Email"
            value={enteredEmail}
            onChangeHandler={emailHandler}
            innerRef={forgotPassRef}
          />
        )}

        <Group position="apart" pt="1rem">
          <Link to="/login">
            <Center inline>
              <IconArrowLeft stroke={1.5} size={20} />
              <Text ml={5}>Back to login page</Text>
            </Center>
          </Link>

          <Button type="submit" disabled={!enteredEmail || emailSent || isSendingRequest}>
            Submit
          </Button>
        </Group>
      </FormCard>
    </Fragment>
  );
};

export default ForgotPassword;
