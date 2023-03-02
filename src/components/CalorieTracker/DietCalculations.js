import { Stack, Text, Title } from "@mantine/core";

const DietCalculations = ({ values }) => {
  return (
    <>
      <Title align="center" order={3} m="1rem" mb="2rem">
        Please review your information
      </Title>
      <Stack spacing="sm">
        <Title order={4} underline align="center">
          Current Daily Goals
        </Title>
        <Text fw={500}>Daily maintenance calories: {values.dailyMaintenanceCalories} calories</Text>
        <Text fw={500}>Daily calorie intake goal: {values.dailyCaloriesGoal} calories</Text>
      </Stack>
      <Stack spacing="sm" mt="10%">
        <Title order={4} underline align="center">
          Entered Information
        </Title>
        <Text>CalorieGoal: {values.calorieGoal}</Text>
        <Text>Activity Level: {values.activityLevel}</Text>
        <Text>Current Weight: {values.currentWeight}</Text>
        <Text>Calorie Adjusted: {values.calorieAdjusted}</Text>
        <Text>Protein Intake: {values.proteinIntake}</Text>
        <Text>Carb to Fat Ratio {values.dietType}</Text>
      </Stack>
    </>
  );
};

export default DietCalculations;
