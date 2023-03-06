import { createStyles, Text, Container, ActionIcon, Group, Anchor, rem } from "@mantine/core";
import { IconBarbell, IconBrandGithub, IconBrandLinkedin } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: "20%",
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  logo: {
    maxWidth: rem(200),
    [theme.fn.smallerThan("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  description: {
    marginTop: rem(5),
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  groups: {
    display: "flex",
    flexWrap: "wrap",

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  wrapper: {
    width: rem(160),
  },

  link: {
    display: "block",
    color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: rem(3),
    paddingBottom: rem(3),

    "&:hover": {
      textDecoration: "underline",
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

const FooterLinks = () => {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <IconBarbell size={30} />
          <Text size="xs" color="dimmed" className={classes.description}>
            Everything you'll ever need for your workout journey
          </Text>
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Group spacing={0} className={classes.social} position="right" noWrap>
          <Anchor href="https://github.com/SinaParvaresh" target="_blank">
            <ActionIcon size="lg">
              <IconBrandGithub size="1.05rem" stroke={1.5} />
            </ActionIcon>
          </Anchor>
          <Anchor href="https://www.linkedin.com/in/sina-parvaresh/" target="_blank">
            <ActionIcon size="lg">
              <IconBrandLinkedin size="1.05rem" stroke={1.5} />
            </ActionIcon>
          </Anchor>
        </Group>
      </Container>
    </footer>
  );
};

export default FooterLinks;
