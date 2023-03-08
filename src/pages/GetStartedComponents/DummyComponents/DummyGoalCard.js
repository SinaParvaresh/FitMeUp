import { createStyles, Card, Image, Text, AspectRatio } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

const DummyGoalCard = () => {
  const { classes } = useStyles();

  return (
    <Card p="md" radius="md" className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={"https://i.ibb.co/JzJDFtj/image.png"} />
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        Keep track of your daily calories and macronutrients
      </Text>
      <Text className={classes.title} mt={5}>
        Keep track of your daily calories and macronutrients
      </Text>
    </Card>
  );
};

export default DummyGoalCard;
