import { Button } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const HeaderProfileButton = () => {
  return (
    <Link to="/user-profile">
      <Button>Profile</Button>
    </Link>
  );
};

export default HeaderProfileButton;
