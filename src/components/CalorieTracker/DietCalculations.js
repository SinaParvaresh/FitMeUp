import { Title } from "@mantine/core";

const DietCalculations = ({ values }) => {
  return (
    <>
      <Title align="center" order={3}>
        Please review your information
      </Title>
      <Title order={4} underline>
        Your Current Goals
      </Title>
      <Title order={5}>Daily maintenance calories: {values.dailyMaintenanceCalories}</Title>
      <Title order={5}>Daily calorie intake goal: {values.dailyCaloriesGoal}</Title>
    </>
  );
};

export default DietCalculations;
