import { useContext } from "react";
import { Fragment } from "react";
import AuthContext from "../store/auth-context";
import classes from "./Header.module.css";
import HeaderLoginButton from "./HeaderLoginButton";
import HeaderLogoutButton from "./HeaderLogoutButton";
import HeaderProfileButton from "./HeaderProfileButton";
import HeaderSignUpButton from "./HeaderSignUpButton";

const Header = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const authLogoutHandler = () => {
    authCtx.logout();
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Workout App</h1>
        {!isLoggedIn && (
          <div className={classes.headerButton}>
            <HeaderLoginButton />
            <HeaderSignUpButton />
          </div>
        )}
        {isLoggedIn && (
          <div className={classes.headerButton}>
            <HeaderProfileButton />
            <HeaderLogoutButton onClick={authLogoutHandler} />
          </div>
        )}
      </header>
    </Fragment>
  );
};

export default Header;
