import { createStyles, Title, Group, Text, Timeline, TimelineItem, Stack, rem } from "@mantine/core";

import CheckmarkBadge from "./CheckmarkBadge";
import NotStartedBadge from "./NotStartedBadge";
import ProgressBadge from "./ProgressBadge";

const useStyles = createStyles((theme) => ({
  timeline: {
    margin: "10%",
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

const RoadMap = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.timeline}>
      <Title className={classes.title} pb="2rem">
        Our 2023 Roadmap
      </Title>

      <Timeline active={2} color="teal" classNames={{ itemTitle: classes.itemTitle, itemContent: classes.itemContent }}>
        <TimelineItem title="January 2023">
          <Stack>
            <Stack spacing={0}>
              <Group spacing={10}>
                <CheckmarkBadge />
                <Text size="lg" color="teal">
                  User authentication & verification
                </Text>
              </Group>
              <Text size="xs" color="dimmed">
                Implemented Firebase for authentication
              </Text>
            </Stack>

            <Stack spacing={0}>
              <Group spacing={10}>
                <CheckmarkBadge />
                <Text size="lg" color="teal">
                  Custom-made diet
                </Text>
              </Group>
              <Text size="xs" color="dimmed">
                Create a unique custom-made diet
              </Text>
            </Stack>
          </Stack>
        </TimelineItem>

        <TimelineItem title="Febuary 2023" color="teal" lineActive>
          <Stack>
            <Stack spacing={0}>
              <Group spacing={10}>
                <CheckmarkBadge />
                <Text size="lg" color="teal">
                  Diet Tracking
                </Text>
              </Group>
              <Text size="xs" color="dimmed">
                Keep track of every meal and it's calories & macronutrients
              </Text>
            </Stack>

            <Stack spacing={0}>
              <Group spacing={10}>
                <CheckmarkBadge />
                <Text size="lg" color="teal">
                  Public Beta Launch
                </Text>
              </Group>
              <Text size="xs" color="dimmed">
                First official public launch of FitMeUp
              </Text>
            </Stack>
          </Stack>
        </TimelineItem>

        <TimelineItem title="March 2023" color="yellow" lineActive lineVariant="dashed">
          <Stack>
            <Stack spacing={0}>
              <Group spacing={10}>
                <ProgressBadge />
                <Text size="lg" color="yellow">
                  Workout Tracking
                </Text>
              </Group>
              <Text size="xs" color="dimmed">
                Keep track of every workout
              </Text>
            </Stack>
            <Stack spacing={0}>
              <Group spacing={10}>
                <NotStartedBadge />
                <Text size="lg" color="red">
                  Progress Analyzer
                </Text>
              </Group>
              <Text size="xs" color="dimmed">
                Show progression charts & daily photos
              </Text>
            </Stack>
            <Stack spacing={0}></Stack>
          </Stack>
        </TimelineItem>

        <TimelineItem title="April 2023">
          <Stack spacing={0}>
            <Group spacing={10}>
              <NotStartedBadge />
              <Text size="lg" color="red">
                Mobile Development
              </Text>
            </Group>
            <Text size="xs" color="dimmed">
              Launch to the iOS and Android app store
            </Text>
          </Stack>
        </TimelineItem>
      </Timeline>
    </div>
  );
};

export default RoadMap;
