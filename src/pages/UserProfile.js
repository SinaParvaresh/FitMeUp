import { Button, Container, Grid, LoadingOverlay, TextInput, Title } from "@mantine/core";
import React, { Fragment, useEffect, useState, useContext } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/init-firebase";
import { getAuth, updateEmail } from "firebase/auth";
import AuthContext from "../components/store/auth-context";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import UserLoadingPage from "../components/UI/UserLoadingPage";
import { isEmail, matches, useForm } from "@mantine/form";

const UserProfile = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLoadingUser, setLoadingUser] = useState(false);
  const auth = getAuth();
  console.log(auth);
  const form = useForm({
    initialValues: {
      first: "",
      last: "",
      email: "",
    },

    validate: {
      first: matches(/^[a-z ,.'-]+$/i, "Please enter a valid first name"),
      last: matches(/^[a-z ,.'-]+$/i, "Please enter a valid last name"),
      email: isEmail("Please enter a valid email address"),
    },
  });

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    // Fill the user's information
    const getUser = async () => {
      const userId = authCtx.userID;
      const userDocRef = doc(db, "users", userId);

      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          form.setValues({
            first: docSnap.data().personal.first,
            last: docSnap.data().personal.last,
            email: docSnap.data().personal.email,
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
  }, [authCtx.token, authCtx.userID]);

  useEffect(() => {
    console.log(form.values);
  }, [form]);

  // Send the user's updated information to the database
  const updateUserHandler = async (event) => {
    event.preventDefault();

    if (form.validate().hasErrors) {
      return;
    }

    setLoadingUser(true);
    const userId = authCtx.userID;
    const userDocRef = doc(db, "users", userId);
    try {
      await updateEmail(auth.currentUser, form.values.email);
      await updateDoc(userDocRef, {
        personal: form.values,
      });
    } catch (error) {
      console.log(error);
    }
    setLoadingUser(false);
  };

  return (
    <Fragment>
      <HeaderMegaMenu />
      <Container>
        {isLoadingPage && <UserLoadingPage />}
        {!isLoadingPage && (
          <form onSubmit={updateUserHandler}>
            <Title order={2} m="md" align="center">
              Account Details
            </Title>
            <Grid justify="center">
              <Grid.Col span={6}>
                <TextInput
                  label="First Name"
                  placeholder="First Name"
                  withAsterisk
                  disabled={isLoadingUser ? true : false}
                  {...form.getInputProps("first")}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput
                  label="Last Name"
                  placeholder="Last Name"
                  withAsterisk
                  disabled={isLoadingUser ? true : false}
                  {...form.getInputProps("last")}
                />
              </Grid.Col>

              <Grid.Col>
                <TextInput
                  label="Email"
                  placeholder="Email"
                  withAsterisk
                  disabled={isLoadingUser ? true : false}
                  {...form.getInputProps("email")}
                />
              </Grid.Col>

              <Button type="submit" disabled={isLoadingUser ? true : false}>
                <LoadingOverlay visible={isLoadingUser} overlayBlur={1} loaderProps={{ variant: "dots" }} />
                Update Information
              </Button>
            </Grid>
          </form>
        )}
      </Container>
    </Fragment>
  );
};

export default UserProfile;
