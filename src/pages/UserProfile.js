import { Button, Grid, LoadingOverlay, Modal, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../lib/init-firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from "firebase/auth";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import UserLoadingPage from "../components/UI/UserLoadingPage";
import { isEmail, matches, useForm } from "@mantine/form";
import AuthContext from "../components/store/auth-context";
import { SideNavBar } from "../components/Layout/NavBar/SideNavBar";

const UserProfile = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLoadingUser, setLoadingUser] = useState(false);
  const [isVerifyingUser, setIsVerifyingUser] = useState(false);
  const [opened, setOpened] = useState(false);
  const [newEmailError, setNewEmailError] = useState(null);
  const [modalInputErrors, setModalInputErrors] = useState({
    currentEmailError: "",
    passwordError: "",
  });

  const authCtx = useContext(AuthContext);
  const userID = authCtx.userID;

  const form = useForm({
    initialValues: {
      first: "",
      last: "",
      email: "",
      newEmail: "",
      password: "",
    },

    initialDirty: { email: false },

    validate: {
      first: matches(/^[a-z ,.'-]+$/i, "Please enter a valid first name"),
      last: matches(/^[a-z ,.'-]+$/i, "Please enter a valid last name"),
      email: isEmail("Please enter a valid email address"),
    },
  });

  // Fill the user's information on initial render
  useEffect(() => {
    const getUser = async () => {
      const userDocRef = doc(db, "users", userID);

      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          form.setValues({
            first: docSnap.data().personal.first,
            last: docSnap.data().personal.last,
            email: auth.currentUser.email,
          });
        } else {
          console.log("Doc does not exist");
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoadingPage(false);
    };

    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Send user's personal informations to the database
  const sendPersonalInfo = async () => {
    setLoadingUser(true);

    const userDocRef = doc(db, "users", userID);

    await updateDoc(
      userDocRef,
      {
        personal: {
          first: form.values.first,
          last: form.values.last,
        },
      },
      { merge: true }
    );
    setLoadingUser(false);
    console.log("sent user info to DB!");
  };

  // Send the user's updated information to the database
  const updateUserHandler = async (event) => {
    event.preventDefault();
    setIsVerifyingUser(false);
    setModalInputErrors(() => {
      return { currentEmailError: "", passwordError: "" };
    });
    if (form.validate().hasErrors) {
      return;
    }

    // if (auth.currentUser)
    try {
      // *Add success message on change
      // *Add error/pop-up on fail

      if (form.isDirty("email")) {
        setOpened(true);
        form.setFieldValue("newEmail", form.values.email);
        form.setFieldValue("email", "");
      } else {
        sendPersonalInfo();
      }
    } catch (error) {
      console.log(error.message);
    }

    console.log("Update user handler done!");
  };

  // On modal Pop-up
  const verifyUserHandler = async (event) => {
    event.preventDefault();
    setNewEmailError("");
    setModalInputErrors(() => {
      return { currentEmailError: "", passwordError: "" };
    });

    if (form.validate().hasErrors) {
      return;
    }
    setIsVerifyingUser(true);

    try {
      const credential = EmailAuthProvider.credential(form.values.email, form.values.password);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updateEmail(auth.currentUser, form.values.newEmail);
      form.setFieldValue("email", form.values.newEmail);
      sendPersonalInfo();
    } catch (error) {
      console.log(error.message);
      if (error.message.includes("email-already-in-use")) {
        setNewEmailError("Email is already in use");
      } else if (error.message.includes("wrong-password")) {
        setModalInputErrors((prev) => {
          return { ...prev, passwordError: "Incorrect password" };
        });
      } else if (error.message.includes("internal-error")) {
        console.log("Empty password");
      } else if (error.message.includes("auth/user-mismatch")) {
        setModalInputErrors(() => {
          const mismatchError = "Invalid current email or password";
          return { currentEmailError: mismatchError, passwordError: mismatchError };
        });
      }
      setIsVerifyingUser(false);
      return;
    }

    // isModalClosed = true;
    form.setFieldValue("password", "");
    form.setFieldValue("newEmail", "");
    setModalInputErrors({ currentEmailError: "", passwordError: "" });
    setIsVerifyingUser(false);
    setOpened(false);
  };

  return (
    <Fragment>
      <HeaderMegaMenu />
      {isLoadingPage && <UserLoadingPage />}
      {!isLoadingPage && (
        <Grid>
          <Grid.Col span={4}>
            <SideNavBar currentComponent="Account details" />
          </Grid.Col>

          <Grid.Col span={6}>
            <Title order={2} m="md" align="center">
              Account Details
            </Title>
            <form onSubmit={updateUserHandler}>
              <TextInput
                label="First Name"
                placeholder="First Name"
                withAsterisk
                disabled={isLoadingUser ? true : false}
                {...form.getInputProps("first")}
              />

              <TextInput
                label="Last Name"
                placeholder="Last Name"
                withAsterisk
                disabled={isLoadingUser ? true : false}
                {...form.getInputProps("last")}
              />

              <TextInput
                label="Email"
                placeholder="Email"
                withAsterisk
                disabled={isLoadingUser ? true : false}
                {...form.getInputProps("email")}
              />

              <Button sx={{ float: "right" }} mt="1rem" type="submit" disabled={isLoadingUser ? true : false}>
                <LoadingOverlay visible={isLoadingUser} overlayBlur={1} loaderProps={{ variant: "dots" }} />
                Update Information
              </Button>
            </form>
          </Grid.Col>
        </Grid>
      )}
      {!isLoadingPage && (
        <Modal
          centered
          opened={opened}
          onClose={() => setOpened(false)}
          title="Please sign in to confirm your email & password"
        >
          <form onSubmit={verifyUserHandler}>
            <Stack pb="1rem">
              <TextInput
                placeholder="Current email"
                label="Current email"
                withAsterisk
                {...form.getInputProps("email")}
                error={modalInputErrors.currentEmailError}
                data-autofocus
              />
              <TextInput
                placeholder="New email"
                label="New email"
                withAsterisk
                {...form.getInputProps("newEmail")}
                error={newEmailError}
              />
              <PasswordInput
                placeholder="Password"
                label="Password"
                withAsterisk
                {...form.getInputProps("password")}
                error={modalInputErrors.passwordError}
              />
            </Stack>
            <Button sx={{ float: "right" }} type="submit" disabled={isVerifyingUser ? true : false}>
              <LoadingOverlay visible={isVerifyingUser} overlayBlur={1} loaderProps={{ variant: "dots" }} />
              Confirm
            </Button>
          </form>
        </Modal>
      )}
    </Fragment>
  );
};

export default UserProfile;
