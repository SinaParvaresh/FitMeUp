import { Stack, Text, Title } from "@mantine/core";

const DietCalculations = ({ values }) => {
  const activityLevel = values.activityLevel;
  let activityLevelReview;
  if (activityLevel < 14.5) {
    activityLevelReview = "Low";
  } else if (activityLevel > 14.75 && activityLevel < 15.25) {
    activityLevelReview = "Medium";
  } else {
    activityLevelReview = "High";
  }
  return (
    <>
      <Title align="center" order={3} m="1rem" mb="2rem">
        Please review your information
      </Title>
      <Stack spacing="sm">
        <Title order={4} underline align="center">
          Current Daily Goals
        </Title>
        <Text fw={500}>Daily maintenance calories: {Math.round(values.dailyMaintenanceCalories)} calories</Text>
        <Text fw={500}>Daily calorie intake goal: {Math.round(values.dailyCaloriesGoal)} calories</Text>
      </Stack>
      <Stack spacing="sm" mt="10%">
        <Title order={4} underline align="center">
          Entered Information
        </Title>
        <Text>CalorieGoal: {values.calorieGoal}</Text>
        <Text>Activity Level: {activityLevelReview}</Text>
        <Text>Current Weight: {values.currentWeight} lbs</Text>
        <Text>Calorie Adjusted: {values.calorieAdjusted} calories</Text>
        <Text>Protein Intake: {values.proteinIntake} g/lb</Text>
        <Text>Carb to Fat Ratio {values.dietType}</Text>
      </Stack>
    </>
  );
};

export default DietCalculations;
