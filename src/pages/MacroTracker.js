import { Button, Code, Paper } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Fragment, useState } from "react";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import { FloatingNumberInput } from "../components/UI/FloatingNumberInput";

const MacroTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mealCalories, setMealCalories] = useState(0);
  const form = useForm({
    initialValues: {
      dates: [],
    },
  });

  return (
    <Fragment>
      <HeaderMegaMenu />
      <Paper shadow="lg" p="md" sx={{ width: "60%", margin: "auto" }} withBorder>
        <DatePicker
          value={currentDate}
          onChange={setCurrentDate}
          allowFreeInput
          placeholder="Pick date"
          label="Today's date"
          withAsterisk
        />
        <FloatingNumberInput
          value={mealCalories}
          onChangeHandler={setMealCalories}
          placeholder="Calories"
          label="Calories"
        />
        <Button
          onClick={() => {
            form.insertListItem("dates", { calories: mealCalories, protein: 0, fats: 0, carbs: 0 });
          }}
        >
          Add Meal
        </Button>
        <Code block>{JSON.stringify(form.values, null, 2)}</Code>
      </Paper>
    </Fragment>
  );
};

export default MacroTracker;
