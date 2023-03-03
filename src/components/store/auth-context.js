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
  const storedUserID = localStorage.getItem("userID");
  const remainingTime = calculateRemainingTime(storedExpirationDate);
  console.log("outside if statement, remaining time is: ", remainingTime);

  // If 5 minutes or less remaining, refresh token.
  if (remainingTime <= 300000) {
    console.log("Remaining time is: ", remainingTime);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userID");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    userID: storedUserID,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  let initialUserID;
  if (tokenData) {
    initialToken = tokenData.token;
    initialUserID = tokenData.userID;
  }

  const [token, setToken] = useState(initialToken);
  const [userID, setUserID] = useState(initialUserID);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserID(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userID");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, userID) => {
    setToken(token);
    setUserID(userID);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("userID", userID);

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  // Sets logout handler to the remaining time, if we Auto-log in the user
  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    userID: userID,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
