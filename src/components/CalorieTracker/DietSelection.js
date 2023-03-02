import { NumberInput, Slider, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";

const DietSelection = (props) => {
  const [proteinValue, setProteinValue] = useState(props.proteinValue);
  const [dietValue, setDietValue] = useState(props.dietTypeValue);

  const proteinMarks = [
    { value: 0.6, label: "Low protein" },
    { value: 1, label: "Moderate protein" },
    { value: 1.4, label: "High protein" },
  ];
  const fatMarks = [
    { value: 0.31, label: "Carb-Focused" },
    { value: 0.35, label: "Balanced" },
    { value: 0.39, label: "Fat-focused" },
  ];

  const onProteinIntakeHandler = (event) => {
    props.onProteinIntakeChangeHandler(event);
    setProteinValue(event);
  };

  const onDietTypeHandler = (event) => {
    props.onDietTypeChangeHandler(event);
    setDietValue(event);
  };

  const proteinLabel = (
    <Text>
      Protein needs vary based on body composition
      <br />
      Choose a lower protein intake if you have higher body fat, and a higher protein intake if you are leaner
    </Text>
  );

  return (
    <div>
      <Title order={3} align="center" sx={{ padding: 10 }}>
        Formulate your diet!
      </Title>
      <Stack>
        <NumberInput
          label="Select your protein intake (g/lb)"
          placeholder="Your protein intake"
          description={proteinLabel}
          step={0.01}
          precision={2}
          value={proteinValue}
          onChange={onProteinIntakeHandler}
          error={props.proteinIntakeError === true ? "Please choose a valid value between 0.5 and 1.5" : false}
          withAsterisk
          variant="unstyled"
          mt="3.5rem"
        />
        <Slider
          defaultValue={0.8}
          min={0.5}
          max={1.5}
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
      {/* <Text c="dimmed">Slide left for higher carbs, slide right for higher fat</Text> */}

      <Stack>
        <NumberInput
          label="Select your Carbs to Fats Ratio (High fat or high carb?)"
          placeholder="Your protein intake"
          description="Slide left for higher carbs, slide right for higher fat"
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
          m="0.5rem"
        />
      </Stack>
    </div>
  );
};

export default DietSelection;
