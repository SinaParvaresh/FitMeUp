import React, { Fragment } from "react";
import Card from "../components/UI/Card";
import Header from "../components/Layout/Header";
import classes from "./UserProfile.module.css";

const UserProfile = (props) => {
  return (
    <Fragment>
      <Header></Header>
      <Card></Card>
    </Fragment>
  );
};

export default UserProfile;
