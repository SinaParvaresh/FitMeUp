import { ActionIcon, Button, Group, LoadingOverlay, Paper, Table, TextInput, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Fragment, useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/init-firebase";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import { FloatingNumberInput } from "../components/UI/FloatingNumberInput";
import { IconTrash } from "@tabler/icons";
import AuthContext from "../components/store/auth-context";

const MacroTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mealName, setMealName] = useState("");
  const [mealCalories, setMealCalories] = useState(0);
  const [proteinAmount, setProteinAmount] = useState(0);
  const [fatAmount, setFatAmount] = useState(0);
  const [carbAmount, setCarbAmount] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authCtx = useContext(AuthContext);
  const userID = authCtx.userID;

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

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const dateSubcollection = `users/${userID}/dates`;
    const userDocDate = currentDate.toLocaleDateString().replace(/\//g, "-");

    await setDoc(doc(db, dateSubcollection, userDocDate), form.values, { merge: true });
    setIsSubmitting(false);
  };

  useEffect(() => {
    // Returns snapshot of current date's meals
    const getUserMeals = async () => {
      const dateSubcollection = `users/${userID}/dates`;
      const userDocDate = currentDate.toLocaleDateString().replace(/\//g, "-");
      const currentDateMealsSnap = await getDoc(doc(db, dateSubcollection, userDocDate));

      if (currentDateMealsSnap.exists()) {
        form.reset();
        form.setFieldValue("totalCalories", currentDateMealsSnap.data().totalCalories);
        currentDateMealsSnap.data().meals.forEach((element) => {
          form.insertListItem("meals", {
            mealName: element.mealName,
            calories: element.calories,
            protein: element.protein,
            fats: element.fats,
            carbs: element.carbs,
          });
        });
      }
    };

    //Clear table before loading with user Data
    getUserMeals();

    return () => {
      form.reset();
    };
  }, [currentDate, userID]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <HeaderMegaMenu />
      <Paper shadow="lg" p="md" sx={{ width: "60%", margin: "auto" }} withBorder>
        <Title order={1} align="center">
          Keep track of your food!
        </Title>
        <form onSubmit={onSubmitHandler}>
          <Group align="center" sx={{ marginBottom: 10 }}>
            <DatePicker
              value={currentDate}
              onChange={setCurrentDate}
              allowFreeInput
              placeholder="Pick date"
              label="Today's date"
              required
            />
            <TextInput
              value={mealName}
              onChange={(event) => {
                setMealName(event.target.value);
              }}
              placeholder="Meal name"
              label="Meal name"
              withAsterisk
            />
          </Group>

          <Group>
            <FloatingNumberInput
              value={mealCalories}
              onChangeHandler={setMealCalories}
              placeholder="Calories"
              label="Calories"
            />
            <FloatingNumberInput
              value={proteinAmount}
              onChangeHandler={setProteinAmount}
              placeholder="Protein"
              label="Protein"
            />
          </Group>
          <Group>
            <FloatingNumberInput value={fatAmount} onChangeHandler={setFatAmount} placeholder="Fats" label="Fats" />
            <FloatingNumberInput
              value={carbAmount}
              onChangeHandler={setCarbAmount}
              placeholder="Carbohydrates"
              label="Carbohydrates"
            />
          </Group>
          <Button type="submit" disabled={isSubmitting ? true : false}>
            <LoadingOverlay visible={isSubmitting} overlayBlur={1} loaderProps={{ variant: "dots" }} />
            Save
          </Button>
        </form>
        <Button onClick={addMeal} sx={{ marginBottom: 10 }}>
          Add Meal
        </Button>
        <Table striped highlightOnHover withColumnBorders horizontalSpacing="md">
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
      </Paper>
    </Fragment>
  );
};

export default MacroTracker;
