import { Fragment } from "react";
import classes from "./Header.module.css";
import HeaderLoginButton from "./HeaderLoginButton";
import HeaderSignUpButton from "./HeaderSignUpButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Workout App</h1>
        <div className={classes.headerButton}>
          <HeaderLoginButton />
          <HeaderSignUpButton />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
