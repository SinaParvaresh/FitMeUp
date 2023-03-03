import React from "react";
import { Card, createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    width: rem(400),
    margin: "auto",
    marginBottom: "10%",
    marginTop: "10%",
  },
}));

const FormCard = (props) => {
  const { classes } = useStyles();

  return (
    <Card className={classes.card} withBorder shadow="lg">
      <form onSubmit={props.onSubmit}>{props.children}</form>
    </Card>
  );
};

export default FormCard;
