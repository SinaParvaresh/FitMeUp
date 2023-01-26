import { Button, Paper, Title } from "@mantine/core";
import { Fragment } from "react";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import CalorieGoal from "../components/CalorieTracker/CalorieGoal";

const CalorieTracker = () => {
  return (
    <Fragment>
      <HeaderMegaMenu />
      {/* <FormCard>
        <Title order={2}>Let's get started</Title>
        <Button>Get Started</Button>
      </FormCard> */}
      <Paper shadow="lg" p="md" sx={{ width: "50%", margin: "auto" }} withBorder>
        <CalorieGoal></CalorieGoal>
      </Paper>
    </Fragment>
  );
};

export default CalorieTracker;
