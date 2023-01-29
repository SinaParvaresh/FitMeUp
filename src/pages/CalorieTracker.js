import { Button, Group, Paper, Stepper } from "@mantine/core";
import { Fragment, useState } from "react";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import CalorieGoal from "../components/CalorieTracker/CalorieGoal";
import { useForm } from "@mantine/form";
import ActivityLevel from "../components/CalorieTracker/ActivityLevel";
// import { useMultiStepForm } from "../components/CalorieTracker/useMultiStepForm";

const CalorieTracker = () => {
  //   const { steps, currentStepIndex } = useMultiStepForm([]);
  const [active, setActive] = useState(0);
  const [activityLevelError, setActivityLevelError] = useState(null);

  const form = useForm({
    initialValues: {
      calorieGoal: "",
      activityLevel: 14,
    },

    validate: (values) => {
      if (active === 0) {
        return { calorieGoal: values.calorieGoal === "" ? "Please select your goal" : null };
      }

      if (active === 1) {
        return {
          activityLevel:
            values.activityLevel < 14 || values.activityLevel > 16 || values.activityLevel == null
              ? "Please choose a valid activity level"
              : null,
        };
      }
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        setActivityLevelError("Please choose a valid activity level");
        console.log("Error in form");
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const onCalorieHandler = (event) => {
    form.setFieldValue("calorieGoal", event);
  };

  const onActivityLevelHandler = (event) => {
    form.setFieldValue("activityLevel", event);
    setActivityLevelError(false);
  };

  return (
    <Fragment>
      <HeaderMegaMenu />
      <Paper shadow="lg" p="md" sx={{ width: "60%", margin: "auto" }} withBorder>
        <form>
          <Stepper active={active} breakpoint="sm">
            <Stepper.Step label="First Step" description="Current goal">
              <CalorieGoal onChangeHandler={onCalorieHandler} />
            </Stepper.Step>
            <Stepper.Step label="Second Step" description="Activity Level">
              <ActivityLevel onChangeHandler={onActivityLevelHandler} error={activityLevelError} />
            </Stepper.Step>
            <Stepper.Step label="Third Step" description=""></Stepper.Step>
          </Stepper>
        </form>

        <Group position="right" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}

          {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
        </Group>
      </Paper>
    </Fragment>
  );
};

export default CalorieTracker;
