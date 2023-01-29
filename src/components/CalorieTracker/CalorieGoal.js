import { Select, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import React, { useState } from "react";

const CalorieGoal = (props) => {
  const [value, setValue] = useState("");

  // const OnChangeInputHandler = (event) => {
  //   setValue(props.onChangeHandler);
  //   console.log(value);
  //   console.log(event.target.value);
  // };

  const onChangeSelectHandler = (event) => {
    props.onChangeHandler(event);
    setValue(event);
    console.log("Value in calorie Goals component is:", event);
  };

  return (
    <>
      <Select
        label="What is your current goal?"
        placeholder="Pick one"
        rightSection={<IconChevronDown size={14} />}
        rightSectionWidth={30}
        styles={{ rightSection: { pointerEvents: "none" } }}
        data={["Maintain Weight", "Lean Bulk (Calorie surplus for muscle gain)", "Lose Weight (Calorie deficit)"]}
        onChange={onChangeSelectHandler}
        value={value}
        error={value === "" ? "Please select your goal" : null}
        withAsterisk
      />
      <Text c="dimmed">
        Note: You can gain muscle in a calorie deficit, however it is significantly slower and much more difficult
        compared to to a Lean Bulk
      </Text>
    </>
  );
};

export default CalorieGoal;
