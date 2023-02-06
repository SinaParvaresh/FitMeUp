import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../components/store/auth-context";
import { db } from "../lib/init-firebase";
import { doc, getDoc } from "firebase/firestore";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import { Button } from "@mantine/core";
import UserLoadingPage from "../components/UI/UserLoadingPage";
import { useNavigate } from "react-router";
import { UserCalories } from "../components/HomePageUI/UserCalories";

const HomePage = () => {
  const [getStarted, setGetStarted] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [userStatistics, setUserStatistics] = useState({
    dailyStatistics: {
      currentWeight: 0,
      dailyCaloriesGoal: 0,
      dailyMaintenanceCalories: 0,
      dietType: 0,
      proteinIntake: 0,
    },
  });
  const [userMealsStatistics, setUserMealStatistics] = useState({
    mealsMacros: {
      proteinToday: 0,
      carbsToday: 0,
      fatsToday: 0,
    },
    totalCalories: 0,
  });

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    //let ignore = false;
    const getUserStatistics = async () => {
      const request = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAb5ucDahLmDupsP3s5M2aSP3Hfczz-_OE",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
          }),
        }
      );
      const response = await request.json();
      const userId = response.users[0].localId;
      const userDocRef = doc(db, "users", userId);
      const docSnap = await getDoc(userDocRef);

      // Check if the user has ever created their calorie tracker plan
      if (!docSnap.data().userStatistics) {
        setGetStarted(true);
      } else {
        const userData = docSnap.data().userStatistics;
        setUserStatistics({
          currentWeight: userData.currentWeight,
          dailyCaloriesGoal: userData.dailyCaloriesGoal,
          dailyMaintenanceCalories: userData.dailyMaintenanceCalories,
          dietType: userData.dietType,
          proteinIntake: userData.proteinIntake,
        });
        setGetStarted(false);
      }
      setIsLoadingStats(false);

      const dateSubcollection = `users/${userId}/dates`;
      const currentDate = new Date().toLocaleDateString().replace(/\//g, "-");
      const docDateSnap = await getDoc(doc(db, dateSubcollection, currentDate));

      // Check if the user has entered any meals for today
      if (!docDateSnap.data()) {
        console.log("user has not entered any meals for today");
      } else {
        const userMeals = docDateSnap.data();
        console.log(docDateSnap.data());
        setUserMealStatistics({
          // proteinToday: userMeals.meals.protein,
          // carbsToday: userMeals.meals.carbs,
          // fatsToday: userMeals.meals.fats,
          totalCalories: userMeals.totalCalories,
        });
      }
    };

    getUserStatistics();

    return () => {
      //ignore = true;
    };
  }, [authCtx.token, getStarted, isLoadingStats]);

  return (
    <Fragment>
      <HeaderMegaMenu />
      {isLoadingStats && <UserLoadingPage />}
      {getStarted && <Button onClick={() => navigate("/calorie-tracker")}>Get started</Button>}
      {!isLoadingStats && !getStarted && (
        <UserCalories values={userStatistics} title="Daily Diet Goal" macros={userMealsStatistics} />
      )}
    </Fragment>
  );
};

export default HomePage;
