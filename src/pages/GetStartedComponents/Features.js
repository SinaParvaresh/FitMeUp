import { Container, createStyles, Flex, Grid, Text, UnstyledButton, Title, rem } from "@mantine/core";
import { IconClipboardText } from "@tabler/icons";
import { useState } from "react";
import DummyMacroTracker from "./DummyComponents/DummyMacroTracker";
import DummyCalorieTracker from "./DummyComponents/DummyCalorieTracker";
import DummyGoalCard from "./DummyComponents/DummyGoalCard";

const useStyles = createStyles((theme) => ({
  icon: {
    display: "inline-block",
    marginRight: "1rem",
    color: theme.colors.blue[5],
    width: `calc(2rem)`,
    height: `calc(2rem)`,
  },

  features: {
    paddingTop: 100,
    paddingBottom: 100,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  container: {
    maxWidth: "70rem",
    marginLeft: "auto",
    marginRight: "auto",
  },

  title: {
    display: "inline-block",
    position: "relative",
    fontWeight: 900,
    fontSize: "2.6rem",
    marginBottom: `calc(3rem)`,
    marginLeft: `1.4rem`,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  featureLabel: {
    display: "flex",
    position: "relative",
    borderRadius: "0.5rem",
    paddingLeft: "1.2rem",
    paddingRight: "1.2rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    marginBottom: "0.5rem",
    width: "auto",
    transition: "all 0.5s ease-out",

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[2],
    },
  },

  featureActive: {
    "&, &:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
      border: "0.02rem solid white",
      borderRadius: "0.5rem",
      boxShadow:
        theme.colorScheme !== "dark"
          ? `${theme.colors.gray[3]} 0 0.07rem 0.1875rem, ${theme.colors.gray[3]} 0px 1.25rem 1.5625rem -0.3125rem, ${theme.colors.gray[3]} 0px 0.625rem 0.625rem -0.3125rem`
          : theme.colors.dark[5],
      transform: "scale(1.05)",
    },
  },

  featureAnimation: {
    opacity: 0,
    transition: "opacity 0.5s ease-in-out",
  },
  text: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
  },
}));

const data = [
  {
    text: "Calorie Tracker",
    description: "A personalized nutrition plan tailored to your fitness goals",
    icon: IconClipboardText,
  },
  {
    text: "Macronutrient Tracker",
    description: "Keep track of your meals and nutrional information",
    icon: IconClipboardText,
  },
  {
    text: "Daily Goals",
    description: "Check in and review your progress everyday to stay on target",
    icon: IconClipboardText,
  },
];

const Features = () => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(data[0].text);

  const features = data.map((feature) => (
    <UnstyledButton
      className={cx(classes.featureLabel, { [classes.featureActive]: feature.text === active })}
      key={feature.text}
      onClick={() => setActive(feature.text)}
    >
      <Flex align="center">
        <feature.icon className={classes.icon} />
        <div>
          <Text className={classes.text}>{feature.text}</Text>
          <Text size="sm" color="dimmed">
            {feature.description}
          </Text>
        </div>
      </Flex>
    </UnstyledButton>
  ));

  return (
    <div className={classes.features}>
      <Container size="85rem">
        <Title order={2} className={classes.title}>
          Features
        </Title>
        <Grid>
          <Grid.Col span="auto">{features}</Grid.Col>
          <Grid.Col md={8} lg={8}>
            {active === data[0].text && <DummyCalorieTracker />}
            {active === data[1].text && <DummyMacroTracker />}
            {active === data[2].text && <DummyGoalCard />}
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default Features;
