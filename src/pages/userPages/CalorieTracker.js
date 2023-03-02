import { useContext, useState } from "react";
import { Button, Code, Group, LoadingOverlay, Paper, Stepper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/init-firebase";
import CalorieGoal from "../../components/CalorieTracker/CalorieGoal";
import ActivityLevel from "../../components/CalorieTracker/ActivityLevel";
import BodyWeight from "../../components/CalorieTracker/BodyWeight";
import DietSelection from "../../components/CalorieTracker/DietSelection";
import DietCalculations from "../../components/CalorieTracker/DietCalculations";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../components/store/auth-context";

const CalorieTracker = () => {
  const [active, setActive] = useState(0);
  const [currentGoalError, setCurrentGoalError] = useState(false);
  const [activityLevelError, setActivityLevelError] = useState(false);
  const [weightError, setWeightError] = useState(false);
  const [calorieAdjustedError, setCaloriesAdjustedError] = useState(false);
  const [proteinIntakeError, setProteinIntakeError] = useState(false);
  const [dietTypeError, setDietTypeError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  const userID = authCtx.userID;

  const form = useForm({
    initialValues: {
      calorieGoal: "",
      activityLevel: 14,
      currentWeight: 0,
      calorieAdjusted: 0,
      proteinIntake: 0,
      dietType: 0,
      dailyMaintenanceCalories: 0,
      dailyCaloriesGoal: 0,
    },

    validate: (values) => {
      if (active === 0 && values.calorieGoal === "") {
        setCurrentGoalError(true);
        return {
          calorieGoal: true,
        };
      }

      if (active === 1 && (values.activityLevel < 14 || values.activityLevel > 16 || values.activityLevel == null)) {
        setActivityLevelError(true);
        return {
          activityLevel: "",
        };
      }

      if (active === 2) {
        if (values.currentWeight > 1000 || values.currentWeight < 100 || values.currentWeight == null) {
          setWeightError(true);
        }

        if (values.calorieAdjusted <= 0 || values.calorieAdjusted > 600 || values.calorieAdjusted == null) {
          setCaloriesAdjustedError(true);
        }
        return {
          currentWeight:
            values.currentWeight > 1000 || values.currentWeight < 100 || values.currentWeight == null ? "" : null,
          calorieAdjusted:
            values.calorieAdjusted <= 0 || values.calorieAdjusted > 600 || isNaN(values.calorieAdjusted) ? "" : null,
        };
      }

      if (active === 3) {
        dailyCaloriesCalc();
        if (values.proteinIntake > 1.5 || values.proteinIntake < 0.5 || values.proteinIntake == null) {
          setProteinIntakeError(true);
        }
        if (values.dietType > 0.4 || values.dietType < 0.3 || values.dietType == null) {
          setDietTypeError(true);
        }
        return {
          proteinIntake: values.proteinIntake > 1.5 || values.proteinIntake < 0.5 || values.proteinIntake == null,
          dietType: values.dietType > 0.4 || values.dietType < 0.3 || values.dietType == null,
        };
      }
      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 4 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const onCalorieHandler = (event) => {
    form.setFieldValue("calorieGoal", event);
    setCurrentGoalError(false);
  };

  const onActivityLevelHandler = (event) => {
    form.setFieldValue("activityLevel", event);
    setActivityLevelError(false);
  };

  const onBodyWeightHandler = (event) => {
    form.setFieldValue("currentWeight", event);
    setWeightError(false);
  };

  const onAdjustedCaloriesHandler = (event) => {
    form.setFieldValue("calorieAdjusted", event);
    setCaloriesAdjustedError(false);
  };

  const onProteinIntakeHandler = (event) => {
    form.setFieldValue("proteinIntake", event);
    setProteinIntakeError(false);
  };

  const onDietTypeHandler = (event) => {
    form.setFieldValue("dietType", event);
    setDietTypeError(false);
  };

  const dailyCaloriesCalc = () => {
    let dailyMainCalories = form.values.activityLevel * form.values.currentWeight;
    form.setFieldValue("dailyMaintenanceCalories", dailyMainCalories);

    if (form.values.calorieGoal === "Maintain Weight") {
      return form.setFieldValue("dailyCaloriesGoal", dailyMainCalories);
    } else if (form.values.calorieGoal.includes("Lean Bulk")) {
      return form.setFieldValue("dailyCaloriesGoal", dailyMainCalories + form.values.calorieAdjusted);
    } else if (form.values.calorieGoal.includes("Lose Weight")) {
      return form.setFieldValue("dailyCaloriesGoal", dailyMainCalories - form.values.calorieAdjusted);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const userDocRef = doc(db, "users", userID);

    await setDoc(userDocRef, { userStatistics: form.values }, { merge: true });
    setIsSubmitting(false);
    navigate("/home-page");
  };

  return (
    <Paper shadow="lg" p="md" sx={{ width: "60%", margin: "auto" }} withBorder>
      <form onSubmit={submitHandler}>
        <Stepper active={active} breakpoint="sm" m={1}>
          <Stepper.Step label="First Step" description="Current goal">
            <CalorieGoal value={form.values.calorieGoal} onChangeHandler={onCalorieHandler} error={currentGoalError} />
          </Stepper.Step>
          <Stepper.Step label="Second Step" description="Activity Level">
            <ActivityLevel
              value={form.values.activityLevel}
              onChangeHandler={onActivityLevelHandler}
              error={activityLevelError}
            />
          </Stepper.Step>
          <Stepper.Step label="Third Step" description="Body Weight Statistics">
            <BodyWeight
              onCurrentWeightHandler={onBodyWeightHandler}
              onAdjustedCaloriesHandler={onAdjustedCaloriesHandler}
              weightValue={form.values.currentWeight}
              calorieValue={form.values.calorieAdjusted}
              weightError={weightError}
              calorieAdjustedError={calorieAdjustedError}
            />
          </Stepper.Step>
          <Stepper.Step label="Final Step" description="Diet Selection">
            <DietSelection
              proteinValue={form.values.proteinIntake}
              dietTypeValue={form.values.dietType}
              onProteinIntakeChangeHandler={onProteinIntakeHandler}
              onDietTypeChangeHandler={onDietTypeHandler}
              proteinIntakeError={proteinIntakeError}
              dietTypeError={dietTypeError}
            />
          </Stepper.Step>
          <Stepper.Completed>
            <DietCalculations values={form.values} />
            <Code block mt="xl">
              {JSON.stringify(form.values, null, 2)}
            </Code>
          </Stepper.Completed>
        </Stepper>

        <Group position="right" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}

          {active !== 4 && <Button onClick={nextStep}>Next step</Button>}
          {active === 4 && (
            <Button type="submit" disabled={isSubmitting ? true : false}>
              <LoadingOverlay visible={isSubmitting} overlayBlur={1} loaderProps={{ variant: "dots" }} />
              Submit
            </Button>
          )}
        </Group>
      </form>
    </Paper>
  );
};

export default CalorieTracker;
