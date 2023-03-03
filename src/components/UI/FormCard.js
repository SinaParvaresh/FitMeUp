import React from "react";
import { Card } from "@mantine/core";

const FormCard = (props) => {
  return (
    <Card withBorder shadow="lg" sx={{ width: 400, margin: "auto", marginBottom: "10%" }}>
      <form onSubmit={props.onSubmit}>{props.children}</form>
    </Card>
  );
};

export default FormCard;
