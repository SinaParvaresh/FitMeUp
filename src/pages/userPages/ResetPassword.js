import { Button, Grid, LoadingOverlay, Modal, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import { SideNavBar } from "../../components/Layout/NavBar/SideNavBar";
import { HeaderMegaMenu } from "../../components/Layout/HeaderMegaMenu";
import { PasswordStrengthBar } from "../../components/UI/PasswordStrengthBar";
import { auth } from "../../lib/init-firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "@firebase/auth";
import UserLoadingPage from "../../components/UI/UserLoadingPage";
import { cleanNotifications, showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [signInLoading, setSignInLoading] = useState(false);
  const [updatePasswordLoading, setUpdatePasswordLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [emailError, setEmailError] = useState("");
  useEffect(() => {
    setPageIsLoading(false);
  }, []);

  // Password validation
  useEffect(() => {
    const hasNumber = /\d/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (
      newPassword.length > 5 &&
      hasNumber &&
      hasLowercase &&
      hasUppercase &&
      hasSpecialCharacter &&
      confirmPassword === newPassword
    ) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  }, [validPassword, confirmPassword, newPassword]);

  const currentPasswordHandler = (event) => {
    setCurrentPassword(event.target.value);
  };

  const passwordHandler = (event) => {
    setNewPassword(event.target.value);
  };

  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const userEmailHandler = (event) => {
    setUserEmail(event.target.value);
  };

  // Change password
  const submitHandler = async (event) => {
    event.preventDefault();
    cleanNotifications();
    setEmailError("");
    setSignInLoading(false);
    setUpdatePasswordLoading(true);
    const user = auth.currentUser;
    showNotification({
      id: "new-password",
      loading: true,
      title: "Chaning password",
      message: "Please wait...",
      autoClose: false,
      disallowClose: true,
    });
    try {
      await updatePassword(user, newPassword);
      setUpdatePasswordLoading(false);
      updateNotification({
        id: "new-password",
        color: "teal",
        title: "Password reset!",
        message: "Your password has been changed",
        autoClose: 10000,
        icon: <IconCheck size={16} />,
      });
    } catch (error) {
      console.log(error.message);
      if (error.message.includes("requires-recent-login")) {
        setOpened(true);
      }
    }
  };

  // User must sign in to change password
  const verifyUserHandler = async (event) => {
    event.preventDefault();
    setEmailError("");
    setUpdatePasswordLoading(false);

    try {
      setSignInLoading(true);
      const credential = EmailAuthProvider.credential(userEmail, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      localStorage.setItem("expirationTime", Date.now() + 3600 * 1000);
    } catch (error) {
      console.log(error.message);
      let errorMessage = error.message;
      if (errorMessage.includes("invalid-email")) {
        setEmailError("Incorrect Email or Password");
      } else if (errorMessage.includes("wrong-password")) {
        setEmailError("Incorrect Email or Password");
      } else if (errorMessage.includes("user-mismatch")) {
        setEmailError("Incorrect Email or Password");
      } else if (errorMessage.includes("to many failed login attempts")) {
        setEmailError(
          "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later"
        );
      } else if (errorMessage.includes("internal-error")) {
        setEmailError("Incorrect Email or Password");
      }
      updateNotification({
        id: "send-email",
        color: "red",
        title: "Please try again",
        message: emailError,
        autoClose: 5000,
        icon: <IconX size={16} />,
      });
      setSignInLoading(false);
      return;
    }

    setOpened(false);
    setUpdatePasswordLoading(false);
  };

  useEffect(() => {
    if (opened === true) {
      setUpdatePasswordLoading(false);
    }
  }, [opened]);

  return (
    <Fragment>
      <HeaderMegaMenu />
      {pageIsLoading && <UserLoadingPage />}

      <Grid>
        <Grid.Col span={4}>
          <SideNavBar currentComponent="Security & Password" />
        </Grid.Col>

        <Grid.Col span={6}>
          <Title order={2} m="md" align="center">
            Change password
          </Title>
          <form onSubmit={submitHandler}>
            <PasswordStrengthBar
              firstPlaceholder="New Password"
              firstLabel="New Password"
              secondPlaceholder="Confirm Password"
              secondLabel="Confirm Password"
              value={newPassword}
              confirmPasswordValue={confirmPassword}
              onChangeHandler={passwordHandler}
              onConfirmPasswordHandler={confirmPasswordHandler}
            />
            <Button sx={{ float: "right" }} type="submit" disabled={!validPassword || updatePasswordLoading}>
              Update password
            </Button>
          </form>
        </Grid.Col>
      </Grid>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Please sign in to confirm your email & password"
      >
        <form onSubmit={verifyUserHandler}>
          <Stack mb="1rem">
            <TextInput
              placeholder="Email"
              label="Email"
              value={userEmail}
              onChange={userEmailHandler}
              withAsterisk
              error={emailError}
              data-autofocus
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              onChange={currentPasswordHandler}
              withAsterisk
              error={emailError}
            />
          </Stack>
          <Button sx={{ float: "right" }} type="submit" disabled={signInLoading}>
            <LoadingOverlay visible={signInLoading} overlayBlur={1} loaderProps={{ variant: "dots" }} />
            Confirm
          </Button>
        </form>
      </Modal>
    </Fragment>
  );
};

export default ResetPassword;
