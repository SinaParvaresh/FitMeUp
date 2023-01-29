import { NumberInput, Slider, Text } from "@mantine/core";
import { useState } from "react";

const ActivityLevel = (props) => {
  const [value, setValue] = useState(14);
  const marks = [
    { value: 14, label: "Low" },
    { value: 15, label: "Medium" },
    { value: 16, label: "High" },
  ];

  const onChangeHandler = (event) => {
    props.onChangeHandler(event);
    setValue(event);
    console.log(event);
  };

  return (
    <div>
      <Text>Select your activity level</Text>
      <Text fz="sm" c="dimmed">
        Low: Sitting behind a desk most of the day
      </Text>
      <Text fz="sm" c="dimmed">
        Medium: Low amount of cardio
      </Text>
      <Text fz="sm" c="dimmed">
        High: Consistent amount of cardio
      </Text>

      <NumberInput
        value={value}
        onChange={onChangeHandler}
        label="Your activity level"
        placeholder="Your activity level"
        step={0.01}
        hideControls
        error={props.error}
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
      />
    </div>
  );
};

export default ActivityLevel;
