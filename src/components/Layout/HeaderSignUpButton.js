import { Button } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const HeaderSignUpButton = (props) => {
  return (
    <Link to="/register">
      <Button>Sign Up</Button>
    </Link>
  );
};

export default HeaderSignUpButton;
