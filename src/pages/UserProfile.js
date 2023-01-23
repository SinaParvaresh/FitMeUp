import { Button, Container, Grid, TextInput, Title } from "@mantine/core";
import React, { Fragment, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/init-firebase";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";

const UserProfile = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    first: "",
    last: "",
    email: "",
  });

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const getUser = async () => {
    const userDocRef = doc(db, "users", "x0DaiDoKwwdUBH6hws5f");

    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
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
  };

  const updateUserHandler = async (event) => {
    event.preventDefault();

    const userDocRef = doc(db, "users", "x0DaiDoKwwdUBH6hws5f");
    try {
      await updateDoc(userDocRef, {
        personal: user,
      });
    } catch (error) {
      console.log(error);
    }

    // updateDoc(userDocRef, user)
    //   .then(() => {
    //     console.log("Value of an existing document field has been udpated");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const firstNameHandler = (event) => {
    setUser((prevState) => ({
      ...prevState,
      first: event.target.value,
    }));
  };

  const lastNameHandler = (event) => {
    // setLastName(event.target.value);
  };

  const emailHandler = (event) => {
    // setEmail(event.target.value);
  };

  return (
    <Fragment>
      <HeaderMegaMenu />
      <Container>
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
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                value={user.last}
                onChange={lastNameHandler}
                withAsterisk
              />
            </Grid.Col>

            <Grid.Col>
              <TextInput label="Email" placeholder="Email" value={user.email} onChange={emailHandler} withAsterisk />
            </Grid.Col>
            <Button type="submit">Update Information</Button>
          </Grid>
        </form>
      </Container>
    </Fragment>
  );
};

export default UserProfile;
