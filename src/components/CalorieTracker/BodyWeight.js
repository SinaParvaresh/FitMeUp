import { useState } from "react";
import { Flex, Stack, Text, Title } from "@mantine/core";
import { FloatingNumberInput } from "../UI/FloatingNumberInput";

const BodyWeight = (props) => {
  const [currentWeight, setCurrentWeight] = useState(props.weightValue);
  const [caloriesAdjusted, setCaloriesAdjusted] = useState(props.calorieValue);

  const onBodyWeightHandler = (event) => {
    props.onCurrentWeightHandler(event);
    setCurrentWeight(event);
  };

  const onCalorieAdjustedHandler = (event) => {
    props.onAdjustedCaloriesHandler(event);
    setCaloriesAdjusted(event);
  };

  return (
    <Flex direction="column" justify="center" gap="xs">
      <Title order={3} align="center" m="1rem">
        Enter your body weight & calorie change
      </Title>

      <Stack align="flex-start">
        <FloatingNumberInput
          label="Current Body Weight"
          placeholder="Current Body Weight"
          value={currentWeight}
          onChangeHandler={onBodyWeightHandler}
          precision={1}
          error={props.weightError ? "Please enter a valid weight" : false}
        />
        <FloatingNumberInput
          label="Calories in Deficit/Bulk"
          placeholder="Calories in Deficit/Bulk"
          value={caloriesAdjusted}
          onChangeHandler={onCalorieAdjustedHandler}
          error={props.calorieAdjustedError ? "Please enter a value between 1-600" : false}
        />
      </Stack>
      <Text c="dimmed">
        Note: To get your most consistent body weight, use your scale on a flat surface and weigh yourself in the
        morning
      </Text>
    </Flex>
  );
};

export default BodyWeight;
