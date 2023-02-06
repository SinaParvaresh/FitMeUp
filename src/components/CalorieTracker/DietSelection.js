import { NumberInput, Slider, Stack, Title } from "@mantine/core";
import { useState } from "react";

const DietSelection = (props) => {
  const [proteinValue, setProteinValue] = useState(props.proteinValue);
  const [dietValue, setDietValue] = useState(props.dietTypeValue);

  const proteinMarks = [
    { value: 0.75, label: "Low" },
    { value: 1, label: "Medium" },
    { value: 1.25, label: "High" },
  ];
  const fatMarks = [
    { value: 0.3, label: "Low " },
    { value: 0.35, label: "Medium" },
    { value: 0.4, label: "High " },
  ];

  const onProteinIntakeHandler = (event) => {
    props.onProteinIntakeChangeHandler(event);
    setProteinValue(event);
  };

  const onDietTypeHandler = (event) => {
    props.onDietTypeChangeHandler(event);
    setDietValue(event);
  };

  return (
    <div>
      <Title order={3} align="center" sx={{ padding: 10 }}>
        Formulate your diet!
      </Title>
      <Stack>
        <NumberInput
          label="Select your protein intake (g/lb)"
          placeholder="Your protein intake"
          step={0.01}
          precision={2}
          value={proteinValue}
          onChange={onProteinIntakeHandler}
          error={props.proteinIntakeError === true ? "Please choose a valid value between 0.75 and 1.25" : false}
          withAsterisk
          variant="unstyled"
          mt="3.5rem"
        />
        <Slider
          min={0.75}
          max={1.25}
          step={0.01}
          precision={2}
          marks={proteinMarks}
          value={proteinValue}
          onChange={onProteinIntakeHandler}
          labelTransition="skew-down"
          labelTransitionDuration={150}
          labelTransitionTimingFunction="ease"
          mt="0.5rem"
        />
      </Stack>

      <Stack>
        <NumberInput
          label="Select your diet type (High fat or high carb?)"
          placeholder="Your protein intake"
          step={0.01}
          precision={2}
          value={dietValue}
          onChange={onDietTypeHandler}
          error={props.dietTypeError === true ? "Please choose a valid value between 0.3 and 0.4" : false}
          withAsterisk
          variant="unstyled"
          mt="3.5rem"
        />
        <Slider
          min={0.3}
          max={0.4}
          step={0.005}
          precision={3}
          marks={fatMarks}
          value={dietValue}
          onChange={onDietTypeHandler}
          labelTransition="skew-down"
          labelTransitionDuration={150}
          labelTransitionTimingFunction="ease"
          mt="0.5rem"
        />
      </Stack>
    </div>
  );
};

export default DietSelection;
