import { Fragment, useContext, useEffect, useState } from "react";
import { db } from "../../lib/init-firebase";
import { doc, getDoc } from "firebase/firestore";
import UserLoadingPage from "../../components/UI/UserLoadingPage";
import { UserCalories } from "../../components/HomePageUI/UserCalories";
import AuthContext from "../../components/store/auth-context";
import CompelteProfile from "./CompleteProfile";

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

  useEffect(() => {
    const getUserStatistics = async () => {
      const userID = authCtx.userID;

      const userDocRef = doc(db, "users", userID);
      const docSnap = await getDoc(userDocRef);

      // Check if the user has ever created their calorie tracker plan
      if (!docSnap.data().userStatistics) {
        setGetStarted(true);
      } else {
        const userData = docSnap.data().userStatistics;
        setUserStatistics({
          currentWeight: userData.currentWeight,
          dailyCaloriesGoal: Math.round(userData.dailyCaloriesGoal),
          dailyMaintenanceCalories: userData.dailyMaintenanceCalories,
          dietType: userData.dietType,
          proteinIntake: userData.proteinIntake,
        });
        setGetStarted(false);
      }
      setIsLoadingStats(false);

      const dateSubcollection = `users/${userID}/dates`;
      const currentDate = new Date().toLocaleDateString().replace(/\//g, "-");
      const docDateSnap = await getDoc(doc(db, dateSubcollection, currentDate));

      // Check if the user has entered any meals for today
      if (!docDateSnap.data()) {
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
  }, [getStarted, isLoadingStats, authCtx.userID]);

  return (
    <Fragment>
      {isLoadingStats && <UserLoadingPage />}
      {getStarted && <CompelteProfile />}
      {!isLoadingStats && !getStarted && (
        <UserCalories values={userStatistics} title="Daily Diet Goal" macros={userMealsStatistics} />
      )}
    </Fragment>
  );
};

export default HomePage;
