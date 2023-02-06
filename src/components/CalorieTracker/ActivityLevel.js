import { NumberInput, Slider, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";

const ActivityLevel = (props) => {
  const [value, setValue] = useState(props.value);
  const marks = [
    { value: 14, label: "Low" },
    { value: 15, label: "Medium" },
    { value: 16, label: "High" },
  ];

  const onChangeHandler = (event) => {
    props.onChangeHandler(event);
    setValue(event);
  };

  return (
    <>
      <Title order={4} align="center">
        Select your activity level
      </Title>
      <NumberInput
        value={value}
        onChange={onChangeHandler}
        label="Your activity level"
        placeholder="Your activity level"
        step={0.01}
        precision={2}
        hideControls
        error={props.error === true ? "Please choose an activity level between 14-16" : false}
        variant="unstyled"
        withAsterisk
        mb="xl"
      />
      <Slider
        value={value}
        onChange={onChangeHandler}
        min={14}
        max={16}
        step={0.01}
        marks={marks}
        labelTransition="skew-down"
        labelTransitionDuration={150}
        labelTransitionTimingFunction="ease"
        sx={{ marginBottom: `${1}rem` }}
      />

      <Stack justify="flex-end" sx={{ paddingTop: `${2}rem` }}>
        <Text fz="sm">Low: Sitting behind a desk most of the day</Text>
        <Text fz="sm">Medium: Low amount of cardio</Text>
        <Text fz="sm">High: Consistent amount of cardio</Text>
      </Stack>
    </>
  );
};

export default ActivityLevel;
