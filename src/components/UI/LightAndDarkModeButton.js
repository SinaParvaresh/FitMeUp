import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";

const LightAndDarkModeButton = (props) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      className={props.className}
    >
      {dark ? <IconSun size="1.2rem" /> : <IconMoonStars size="1.2rem" />}
    </ActionIcon>
  );
};

export default LightAndDarkModeButton;
