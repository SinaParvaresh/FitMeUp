import React, { Fragment } from "react";
import Card from "../components/UI/Card";
import Header from "../components/Layout/Header";
import classes from "./UserProfile.module.css";

const UserProfile = (props) => {
  return (
    <Fragment>
      <Header></Header>
      <Card>
        <label>First Name</label>
        <input className={classes.input}></input>
        <label>Last Name</label>
        <input className={classes.input}></input>
        <select className={classes.input}></select>
      </Card>
    </Fragment>
  );
};

export default UserProfile;
