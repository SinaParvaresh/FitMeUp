import { createStyles, Progress, Box, Text, Group, Paper, SimpleGrid } from "@mantine/core";
import { IconMeat } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  progressLabel: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
  },

  stat: {
    borderBottom: "3px solid",
    paddingBottom: 5,
  },

  statCount: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.3,
  },

  diff: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    display: "flex",
    alignItems: "center",
  },

  icon: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4],
  },
}));

export function UserMacros({ userData }) {
  const { classes } = useStyles();
  const dailyCaloriesGoal = userData.dailyCaloriesGoal;
  const totalProtein = (userData.proteinIntake * userData.weight).toFixed();
  const totalFat = (userData.dietType * userData.weight).toFixed();
  const totalCarb = ((dailyCaloriesGoal - totalProtein * 4 - totalFat * 9) / 4).toFixed();

  const data = [
    {
      label: "Protein",
      count: totalProtein,
      part: ((totalProtein * 4) / dailyCaloriesGoal) * 100,
      color: "#1864AB",
    },
    {
      label: "Fat",
      count: totalFat,
      part: ((totalFat * 9) / dailyCaloriesGoal) * 100,
      color: "#FCC419",
    },
    {
      label: "Carbohydrate",
      count: totalCarb,
      part: ((totalCarb * 4) / dailyCaloriesGoal) * 100,
      color: "#2B8A3E",
    },
  ];

  const segments = data.map((segment) => ({
    value: segment.part,
    color: segment.color,
    label: segment.part > 10 ? `${segment.part.toFixed(2)}%` : undefined,
  }));

  const descriptions = data.map((stat) => (
    <Box key={stat.label} sx={{ borderBottomColor: stat.color }} className={classes.stat}>
      <Text transform="uppercase" size="xs" color="dimmed" weight={700}>
        {stat.label}
      </Text>

      <Group position="apart" align="flex-end" spacing={0}>
        <Text weight={700}>{stat.count + "g"}</Text>
        <Text color={stat.color} weight={700} size="sm" className={classes.statCount}>
          {stat.part.toFixed(2)}%
        </Text>
      </Group>
    </Box>
  ));

  return (
    <Paper mt="xl" radius="md">
      <Group position="apart">
        <Group align="flex-end" spacing="xs">
          <Text size="xl" weight={700}>
            Macros
          </Text>
        </Group>
        <IconMeat size={20} className={classes.icon} stroke={1.5} />
      </Group>

      <Text color="dimmed" size="sm">
        A breakdown of your daily macronutrients{" "}
      </Text>

      <Progress sections={segments} size={34} classNames={{ label: classes.progressLabel }} mt={40} />
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "xs", cols: 1 }]} mt="xl">
        {descriptions}
      </SimpleGrid>
    </Paper>
  );
}
