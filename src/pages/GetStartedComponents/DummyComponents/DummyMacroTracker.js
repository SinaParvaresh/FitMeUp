import {
  ActionIcon,
  Button,
  Group,
  LoadingOverlay,
  NumberInput,
  Paper,
  ScrollArea,
  SimpleGrid,
  Table,
  TextInput,
  Title,
  rem,
  createStyles,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { IconCalendar, IconTrash } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  paper: {
    width: "100%",
    maxWidth: rem(800),
    padding: "1rem",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
}));

const DummyMacroTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mealName, setMealName] = useState("");
  const [mealCalories, setMealCalories] = useState(0);
  const [proteinAmount, setProteinAmount] = useState(0);
  const [fatAmount, setFatAmount] = useState(0);
  const [carbAmount, setCarbAmount] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      meals: [],
      totalCalories: 0,
    },
  });

  const addMeal = () => {
    form.insertListItem("meals", {
      mealName: mealName,
      calories: mealCalories,
      protein: proteinAmount,
      fats: fatAmount,
      carbs: carbAmount,
    });

    setTotalCalories((prev) => {
      return prev + mealCalories;
    });

    form.setFieldValue("totalCalories", totalCalories + mealCalories);

    // Reset fields after adding each meal
    resetValues();
  };

  const resetValues = () => {
    setMealName("");
    setMealCalories(0);
    setProteinAmount(0);
    setFatAmount(0);
    setCarbAmount(0);
  };

  const deleteRow = (row, index) => {
    // Take away the calories the meal provided
    form.setFieldValue("totalCalories", totalCalories - row.calories);
    setTotalCalories((prev) => {
      return prev - row.calories;
    });

    // Then remove the meal from the list
    form.removeListItem("meals", index);
  };

  const rows = form.values.meals.map((row, index) => (
    <tr key={index}>
      <td>{row.mealName}</td>
      <td>{row.calories}</td>
      <td>{row.protein + "g"}</td>
      <td>{row.fats + "g"}</td>
      <td>{row.carbs + "g"}</td>
      <td>
        <ActionIcon color="red" onClick={() => deleteRow(row, index)}>
          <IconTrash size={16} stroke={1.5} />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <Paper className={classes.paper}>
      <Title order={1} align="center" m="md">
        Try it out!
      </Title>
      <SimpleGrid breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <Group grow>
          <DatePickerInput
            icon={<IconCalendar size="1.1rem" stroke={1.5} />}
            clearable
            value={currentDate}
            onChange={setCurrentDate}
            placeholder="Pick date"
            label="Current date"
            required
            maw="50%"
          />
          <TextInput
            value={mealName}
            onChange={(event) => {
              setMealName(event.target.value);
            }}
            placeholder="Meal name"
            label="Meal name"
            withAsterisk
            maw="50%"
          />
        </Group>

        <Group grow>
          <NumberInput value={mealCalories} onChange={setMealCalories} placeholder="Calories" label="Calories" />
          <NumberInput value={proteinAmount} onChange={setProteinAmount} placeholder="Protein" label="Protein" />
          <NumberInput value={fatAmount} onChange={setFatAmount} placeholder="Fats" label="Fats" />
          <NumberInput value={carbAmount} onChange={setCarbAmount} placeholder="Carbohydrates" label="Carbohydrates" />
        </Group>
      </SimpleGrid>
      <Button type="button" onClick={addMeal} m="1rem">
        Add Meal
      </Button>
      <ScrollArea type="auto" style={{ width: "auto" }} offsetScrollbars>
        <Table striped highlightOnHover withColumnBorders horizontalSpacing="md" my="2rem">
          <thead>
            <tr>
              <th>Meal Name</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Fats</th>
              <th>Carbohydrates</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>

      <Button type="submit" mb={10} mt={10} sx={{ width: "50%", left: "25%" }}>
        <LoadingOverlay overlayBlur={1} loaderProps={{ variant: "dots" }} />
        Save
      </Button>
    </Paper>
  );
};

export default DummyMacroTracker;
