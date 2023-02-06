import { createStyles, Text, Card, Group, RingProgress, Title } from "@mantine/core";
import { UserMacros } from "./UserMacros";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 1,
  },

  inner: {
    display: "flex",

    [theme.fn.smallerThan(350)]: {
      flexDirection: "column",
    },
  },

  ring: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",

    [theme.fn.smallerThan(350)]: {
      justifyContent: "center",
      marginTop: theme.spacing.md,
    },
  },
}));

export function UserCalories({ title, values, macros }) {
  const { classes, theme } = useStyles();
  const userStats = {
    weight: values.currentWeight,
    dailyCaloriesGoal: values.dailyCaloriesGoal,
    dailyMaintenanceCalories: values.dailyMaintenanceCalories,
    dietType: values.dietType,
    proteinIntake: values.proteinIntake,
    totalCaloriesToday: macros.totalCalories,
  };

  const userData = {
    weight: userStats.weight,
    dietType: userStats.dietType,
    proteinIntake: userStats.proteinIntake,
    dailyCaloriesGoal: userStats.dailyCaloriesGoal,
  };

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Title align="center" className={classes.label}>
        {title}
      </Title>
      <div className={classes.inner}>
        <div>
          <div>
            <Text className={classes.lead} mt={30}>
              {userStats.dailyCaloriesGoal + " calories"}
            </Text>
            <Text size="xs" color="dimmed">
              Daily Goal
            </Text>
          </div>
          <Group mt="lg">
            <div>
              <Text className={classes.label}>{userStats.dailyCaloriesGoal - userStats.totalCaloriesToday}</Text>
              <Text size="xs" color="dimmed">
                Remaining calories
              </Text>
            </div>
            <div>
              <Text className={classes.label}>{userStats.weight + "lbs"}</Text>
              <Text size="xs" color="dimmed">
                Current weight
              </Text>
            </div>
          </Group>
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[
              {
                value: (userStats.totalCaloriesToday / userStats.dailyCaloriesGoal) * 100,
                color: theme.primaryColor,
              },
            ]}
            label={
              <div>
                <Text align="center" size="lg" className={classes.label} sx={{ fontSize: 22 }}>
                  {((userStats.totalCaloriesToday / userStats.dailyCaloriesGoal) * 100).toFixed(0)}%
                </Text>
                <Text align="center" size="xs" color="dimmed">
                  Today's goal
                </Text>
              </div>
            }
          />
        </div>
      </div>
      <div>
        <UserMacros userData={userData} />
      </div>
    </Card>
  );
}