import { Button, Container, Grid, LoadingOverlay, TextInput, Title } from "@mantine/core";
import React, { Fragment, useEffect, useState, useContext } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/init-firebase";
import AuthContext from "../components/store/auth-context";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import UserLoadingPage from "../components/UI/UserLoadingPage";

const UserProfile = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLoadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState({
    first: "",
    last: "",
    email: "",
  });

  const authCtx = useContext(AuthContext);

  // Load on first page render
  useEffect(() => {
    // Fill the user's information
    const getUser = async () => {
      const request = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAb5ucDahLmDupsP3s5M2aSP3Hfczz-_OE",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
          }),
        }
      );
      const response = await request.json();
      const userId = response.users[0].localId;
      const userDocRef = doc(db, "users", userId);

      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setUser({
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
  }, [authCtx.token]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  // Send the user's updated information to the database
  const updateUserHandler = async (event) => {
    event.preventDefault();

    setLoadingUser(true);
    const userId = await fetchUserId();
    const userDocRef = doc(db, "users", userId);
    try {
      await updateDoc(userDocRef, {
        personal: user,
      });
    } catch (error) {
      console.log(error);
    }
    setLoadingUser(false);
  };

  // Get the user's unique ID from firebase
  const fetchUserId = async () => {
    const request = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAb5ucDahLmDupsP3s5M2aSP3Hfczz-_OE",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
        }),
      }
    );
    const response = await request.json();
    const userId = response.users[0].localId;
    return userId;
  };

  const firstNameHandler = (event) => {
    setUser((prevState) => ({
      ...prevState,
      first: event.target.value.trim(),
    }));
  };

  const lastNameHandler = (event) => {
    setUser((prevState) => ({
      ...prevState,
      last: event.target.value.trim(),
    }));
  };

  const emailHandler = (event) => {
    setUser((prevState) => ({
      ...prevState,
      email: event.target.value.trim(),
    }));
  };

  return (
    <Fragment>
      <HeaderMegaMenu />
      <Container>
        {isLoadingPage && <UserLoadingPage />}
        {!isLoadingPage && (
          <form onSubmit={updateUserHandler}>
            <Title order={2} m="md">
              Account Details
            </Title>
            <Grid justify="center">
              <Grid.Col span={6}>
                <TextInput
                  label="First Name"
                  placeholder="First Name"
                  value={user.first}
                  onChange={firstNameHandler}
                  withAsterisk
                  disabled={isLoadingUser ? true : false}
                />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput
                  label="Last Name"
                  placeholder="Last Name"
                  value={user.last}
                  onChange={lastNameHandler}
                  withAsterisk
                  disabled={isLoadingUser ? true : false}
                />
              </Grid.Col>

              <Grid.Col>
                <TextInput
                  label="Email"
                  placeholder="Email"
                  value={user.email}
                  onChange={emailHandler}
                  withAsterisk
                  disabled={isLoadingUser ? true : false}
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
