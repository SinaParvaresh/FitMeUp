import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  return expirationTime - Date.now();
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  // If 5 minutes or less remaining, refresh token.
  if (remainingTime <= 300000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  // const [localId, setLocalId] = useState(null);
  const userIsLoggedIn = !!token;

  //Get the users unique ID
  // const uniqueIdHandler = async (token) => {
  //   const request = await fetch(
  //     "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAb5ucDahLmDupsP3s5M2aSP3Hfczz-_OE",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         idToken: token,
  //       }),
  //     }
  //   );
  //   const response = await request.json();
  //   setLocalId(response.users[0].localId);
  //   console.log(response.users[0].localId);
  //   return response.users[0].localId;
  // };

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  // Sets logout handler to the remaining time, if we Auto-log in the user
  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  // useEffect(() => {
  //   if (userIsLoggedIn) {
  //     uniqueIdHandler(token);
  //   }
  // }, [token, userIsLoggedIn, uniqueIdHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    // uniqueId: uniqueIdHandler,
    // localId: localId,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
