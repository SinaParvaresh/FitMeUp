import { Title } from "@mantine/core";

const DietCalculations = ({ values }) => {
  return (
    <>
      <Title align="center" order={1}>
        Please review your information
      </Title>
      <Title order={3}>Your Current Goals</Title>
      <Title order={4}>Daily maintenance calories: {values.dailyMaintenanceCalories}</Title>
      <Title order={4}>Daily calorie intake goal: {values.dailyCaloriesGoal}</Title>
    </>
  );
};

export default DietCalculations;
