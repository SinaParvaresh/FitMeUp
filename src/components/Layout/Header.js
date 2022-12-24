import { Fragment } from "react";
import classes from "./Header.module.css";
import HeaderLoginButton from "./HeaderLoginButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Workout App</h1>
        <div>
          <HeaderLoginButton />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
