import { Container, createStyles, Flex, Grid, Text, UnstyledButton, Title, rem } from "@mantine/core";
import { IconClipboardText } from "@tabler/icons";
import CalorieTrackerCardGrid from "./CalorieTrackerCardGrid";
import CalorieTrackerCarousel from "./CalorieTrackerCarousel";

const useStyles = createStyles((theme) => ({
  icon: {
    display: "inline-block",
    marginRight: "1rem",
    color: theme.colors.grape[9],
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
    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },

  text: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
  },
}));

const Features = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.features}>
      <Container>
        <Title order={2} className={classes.title}>
          Features
        </Title>
        <Grid>
          <Grid.Col span={4}>
            <UnstyledButton className={classes.featureLabel}>
              <Flex align="center">
                <IconClipboardText className={classes.icon} />
                <div>
                  <Text className={classes.text}>Calorie Tracker</Text>
                  <Text size="sm" color="dimmed">
                    A personalized nutrition plan tailored to your fitness goals
                  </Text>
                </div>
              </Flex>
            </UnstyledButton>
            <UnstyledButton className={classes.featureLabel}>
              <Flex align="center">
                <IconClipboardText className={classes.icon} />
                <div>
                  <Text className={classes.text}>Macronutrient Tracker</Text>
                  <Text size="sm" color="dimmed">
                    Keep track of your meals and nutrional information
                  </Text>
                </div>
              </Flex>
            </UnstyledButton>
            <UnstyledButton className={classes.featureLabel}>
              <Flex align="center">
                <IconClipboardText className={classes.icon} />
                <div>
                  <Text className={classes.text}>Daily Goals</Text>
                  <Text size="sm" color="dimmed">
                    Check in and review your progress everyday to stay on target
                  </Text>
                </div>
              </Flex>
            </UnstyledButton>
          </Grid.Col>
          <Grid.Col span={8}>
            <CalorieTrackerCarousel />
            <CalorieTrackerCardGrid />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default Features;
