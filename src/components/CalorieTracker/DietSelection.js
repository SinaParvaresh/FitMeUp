import { NumberInput, Slider, Title } from "@mantine/core";
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
    console.log(event);
  };

  const onDietTypeHandler = (event) => {
    props.onDietTypeChangeHandler(event);
    setDietValue(event);
    console.log(event);
  };
  return (
    <div>
      <div>
        <Title order={2} align="center" sx={{ padding: 10 }}>
          Formulate your diet!
        </Title>
        <Title order={4} align="start" sx={{ marginTop: 10, marginBottom: 10, paddingTop: 20 }}>
          Select your protein intake (g/lb)
        </Title>
        <NumberInput
          placeholder="Your protein intake"
          step={0.01}
          precision={2}
          value={proteinValue}
          onChange={onProteinIntakeHandler}
          error={props.proteinIntakeError === true ? "Please choose a valid value between 0.75 and 1.25" : false}
        />
        <Slider
          sx={{ marginTop: `${2.25}em` }}
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
        />
      </div>

      <div>
        <Title order={4} align="start" sx={{ marginTop: 20, marginBottom: 10, paddingTop: 20 }}>
          Select your diet type (High fat or high carb?)
        </Title>
        <NumberInput
          placeholder="Your protein intake"
          step={0.01}
          precision={2}
          value={dietValue}
          onChange={onDietTypeHandler}
          error={props.dietTypeError === true ? "Please choose a valid value between 0.3 and 0.4" : false}
        />
        <Slider
          sx={{ marginTop: `${2.25}em` }}
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
        />
      </div>
    </div>
  );
};

export default DietSelection;
