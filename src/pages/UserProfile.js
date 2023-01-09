import React, { Fragment } from "react";
import Card from "../components/UI/Card";
import classes from "./UserProfile.module.css";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import { FloatingLabelInput } from "../components/UI/FloatingLabelInput";

const UserProfile = (props) => {
  return (
    <Fragment>
      <HeaderMegaMenu />
      <Card>
        <label>First Name</label>
        <input className={classes.input}></input>
        <label>Last Name</label>
        <input className={classes.input}></input>
        <select className={classes.input}></select>
        <FloatingLabelInput label="hi" />
      </Card>
    </Fragment>
  );
};

export default UserProfile;
