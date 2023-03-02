import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Title,
  Burger,
  Drawer,
  Collapse,
} from "@mantine/core";
import { IconBook, IconChevronDown, IconBarbell, IconCalculator } from "@tabler/icons";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import HeaderLoginButton from "./HeaderLoginButton";
import HeaderLogoutButton from "./HeaderLogoutButton";
import HeaderProfileButton from "./HeaderProfileButton";
import HeaderSignUpButton from "./HeaderSignUpButton";
import LightAndDarkModeButton from "../../UI/LightAndDarkModeButton";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]}`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const data = [
  {
    icon: IconCalculator,
    title: "Calorie Calculator",
    description: "Calculate and track your own calories daily",
    path: "/calorie-tracker",
  },
  {
    icon: IconBook,
    title: "Macro Tracker",
    description: "Keep track of each meal",
    path: "/macro-tracker",
  },
];

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const navigate = useNavigate();
  const authLogoutHandler = () => {
    authCtx.logout();
  };

  const links = data.map((item) => (
    <Link to={`${item.path}`} key={item.title}>
      <UnstyledButton className={classes.subLink}>
        <Group noWrap align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon size={22} color={theme.fn.primaryColor()} />
          </ThemeIcon>
          <div>
            <Text size="sm" weight={500}>
              {item.title}
            </Text>
            <Text size="xs" color="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    </Link>
  ));

  return (
    <Box pb={200}>
      <Header height={60} mb="lg" px="md" style={{ position: "relative", zIndex: 6 }}>
        <Group position="apart" sx={{ height: "100%" }} className={classes.hiddenMobile}>
          <Link to="/get-started" className={classes.link}>
            <IconBarbell size={30} />
            <Title order={3} p="1rem">
              FitMeUp
            </Title>
          </Link>
          <Group sx={{ height: "100%" }}>
            <Link to="/home-page" className={classes.link}>
              Home
            </Link>
            <HoverCard
              openDelay={400}
              closeDelay={250}
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <Link className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                  </Center>
                </Link>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                <Group position="apart" px="md">
                  <Text weight={500}>Features</Text>
                </Group>

                <Divider my="sm" mx="-md" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group position="apart">
                    <div>
                      <Text weight={500} size="sm">
                        Get started
                      </Text>
                      <Text size="xs" color="dimmed">
                        Start your journey to fitness!
                      </Text>
                    </div>
                    <Button variant="default" onClick={() => navigate("/calorie-tracker")}>
                      Get started
                    </Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>

          <Group>
            {!isLoggedIn && (
              <Group>
                <HeaderLoginButton />
                <HeaderSignUpButton />
              </Group>
            )}

            {isLoggedIn && (
              <Group>
                <HeaderProfileButton />
                <HeaderLogoutButton onClick={authLogoutHandler} />
              </Group>
            )}

            <LightAndDarkModeButton />
          </Group>
        </Group>

        <Group position="apart" sx={{ height: "100%" }} className={classes.hiddenDesktop}>
          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          <Link to="/get-started" className={classes.link}>
            <IconBarbell size={30} />
            <Title order={3} p={8}>
              FitMeUp
            </Title>
          </Link>
          <LightAndDarkModeButton className={classes.hiddenDesktop} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        className={classes.hiddenDesktop}
        sx={{ position: "fixed", zIndex: 5 }}
        padding="10%"
        size="100%"
        withCloseButton={false}
      >
        <Link to="/home-page" className={classes.link} onClick={closeDrawer}>
          Home
        </Link>

        <UnstyledButton className={classes.link} onClick={toggleLinks}>
          <Center inline>
            <Box component="span" mr={5}>
              Features
            </Box>
            <IconChevronDown size={16} color={theme.fn.primaryColor()} />
          </Center>
        </UnstyledButton>
        <Collapse in={linksOpened} onClick={closeDrawer}>
          {links}
        </Collapse>
        <Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

        {!isLoggedIn && (
          <Group position="center" pb="xl" px="md" onClick={closeDrawer}>
            <HeaderLoginButton />
            <HeaderSignUpButton />
          </Group>
        )}

        {isLoggedIn && (
          <Group position="center" pb="xl" px="md" onClick={closeDrawer}>
            <HeaderProfileButton />
            <HeaderLogoutButton onClick={authLogoutHandler} />
          </Group>
        )}
      </Drawer>
    </Box>
  );
}
