import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

const HeaderLoginButton = (props) => {
  return (
    <Link to="/login">
      <Button variant="default">Log in</Button>
    </Link>
  );
};

export default HeaderLoginButton;
