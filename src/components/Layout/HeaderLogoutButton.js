import { Button } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const HeaderLogoutButton = (props) => {
  return (
    <Link to="/login">
      <Button onClick={props.onClick}>Log Out</Button>
    </Link>
  );
};

export default HeaderLogoutButton;
