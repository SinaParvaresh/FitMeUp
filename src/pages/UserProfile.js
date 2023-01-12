import React, { Fragment } from "react";
import { Card } from "@mantine/core";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import { FloatingLabelInput } from "../components/UI/FloatingLabelInput";

const UserProfile = (props) => {
  return (
    <Fragment>
      <HeaderMegaMenu />
      <Card>
        <FloatingLabelInput label="First Name" placeholder="First Name" />
        <FloatingLabelInput label="Last Name" placeholder="Last Name" />
      </Card>
    </Fragment>
  );
};

export default UserProfile;
