import { Select, Text, Title } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import React, { useState } from "react";

const CalorieGoal = (props) => {
  const [value, setValue] = useState(props.value);

  const onChangeSelectHandler = (event) => {
    props.onChangeHandler(event);
    setValue(event);
  };

  return (
    <>
      <Title order={4} align="center">
        What is your current goal?
      </Title>
      <Select
        label="Current goal"
        placeholder="Pick one"
        rightSection={<IconChevronDown size={14} />}
        rightSectionWidth={30}
        styles={{ rightSection: { pointerEvents: "none" } }}
        data={["Maintain Weight", "Lean Bulk (Calorie surplus for muscle gain)", "Lose Weight (Calorie deficit)"]}
        onChange={onChangeSelectHandler}
        value={value}
        error={props.error ? "Please select your goal" : false}
        withAsterisk
        sx={{ width: `${50}%` }}
      />
      <Text c="dimmed" pt={16}>
        Note: You can gain muscle in a calorie deficit, however it is significantly slower and much more difficult
        compared to to a Lean Bulk
      </Text>
    </>
  );
};

export default CalorieGoal;
