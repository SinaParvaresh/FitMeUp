import { Button, Container, Grid, Title } from "@mantine/core";
import React, { Fragment } from "react";
import { HeaderMegaMenu } from "../components/Layout/HeaderMegaMenu";
import { FloatingLabelInput } from "../components/UI/FloatingLabelInput";
// import FormCard from "../components/UI/FormCard";

const UserProfile = (props) => {
  return (
    <Fragment>
      <HeaderMegaMenu />
      <Container>
        <form>
          <Title order={2} m="md">
            Account Details
          </Title>

          <Grid justify="center">
            <Grid.Col span={6}>
              <FloatingLabelInput label="First Name" placeholder="First Name" />
            </Grid.Col>

            <Grid.Col span={6}>
              <FloatingLabelInput label="Last Name" placeholder="Last Name" />
            </Grid.Col>

            <Grid.Col>
              <FloatingLabelInput label="Email" placeholder="Email" />
            </Grid.Col>
            <Button>Update Information</Button>
          </Grid>
        </form>
      </Container>
    </Fragment>
  );
};

export default UserProfile;
