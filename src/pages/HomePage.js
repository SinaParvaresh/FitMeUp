import React, { Fragment } from "react";
import Card from "../components/UI/Card";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";

const HomePage = (props) => {
  return (
    <Fragment>
      <HeaderMegaMenu />

      <Card></Card>
    </Fragment>
  );
};

export default HomePage;
