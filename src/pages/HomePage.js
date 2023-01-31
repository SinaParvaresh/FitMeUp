import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../components/store/auth-context";
import { db } from "../lib/init-firebase";
import { doc, getDoc } from "firebase/firestore";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import { Button } from "@mantine/core";

const HomePage = (props) => {
  const [getStarted, setGetStarted] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    let ignore = false;

    async function getUserStatistics() {
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
        console.log("User has not entered the stats before");
        setGetStarted(true);
      } else {
        console.log("User STATS are: ", docSnap.data().userStatistics);
        setGetStarted(false);
      }
      setIsLoadingStats(false);
    }

    getUserStatistics();

    return () => {
      ignore = true;
    };
  }, [authCtx.token, getStarted, isLoadingStats]);

  return (
    <Fragment>
      <HeaderMegaMenu />

      {getStarted && <Button>Get started</Button>}
    </Fragment>
  );
};

export default HomePage;
