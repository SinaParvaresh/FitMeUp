import { Slider, Stack, Text, Title } from "@mantine/core";
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
      <Title order={3} align="center" m="1rem" mb="5%">
        Select your activity level
      </Title>
      <Slider
        value={value}
        onChange={onChangeHandler}
        min={14}
        max={16}
        step={0.01}
        marks={marks}
        label={null}
        showLabelOnHover={false}
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
