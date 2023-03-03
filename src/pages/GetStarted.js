import { createStyles, Container, Title, Button, Group, Text, List, ThemeIcon, Anchor, rem } from "@mantine/core";
import { IconBrandGithub, IconCheck } from "@tabler/icons";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import CalorieTrackerCarousel from "../components/UI/Carousels/CalorieTrackerCarousel";
import CalorieTrackerCardGrid from "./GetStartedComponents/CalorieTrackerCardGrid";
import RoadMap from "./GetStartedComponents/RoadMap";

const useStyles = createStyles((theme) => ({
  icon: {
    display: "inline-block",
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },

  timeline: {
    margin: "10%",
  },

  itemTitle: {
    fontSize: "13px",
    position: "relative",
    right: "25%",
    marginLeft: "5%",
    marginRight: "5%",
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

const GetStarted = () => {
  const { classes } = useStyles();
  return (
    <Fragment>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              An <span className={classes.highlight}>all-in-one</span> <br /> workout app
            </Title>
            <Text color="dimmed" mt="md">
              Everything you need for your workout journey, bundled up for you!
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={rem(12)} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Unique custom-made diet</b> – create and customize a macronutrient based diet with our in-house
                formula! Tell us about yourself and we'll handle the rest
              </List.Item>
              <List.Item>
                <b>Keep track of your daily food consumption</b> – let us know what you eat and we'll calculate your
                remaining daily goal
              </List.Item>
            </List>

            <Group mt={30}>
              <Link to="/login">
                <Button radius="xl" size="md" className={classes.control}>
                  Get started
                </Button>
              </Link>
              <Anchor href="https://github.com/SinaParvaresh" target="_blank">
                <Button variant="default" radius="xl" size="md" className={classes.control}>
                  Source code
                  <IconBrandGithub />
                </Button>
              </Anchor>
            </Group>
          </div>
        </div>
        <Container>
          <CalorieTrackerCarousel />
        </Container>
        <div>
          <CalorieTrackerCardGrid />
        </div>
        <RoadMap />
      </Container>
    </Fragment>
  );
};
export default GetStarted;
