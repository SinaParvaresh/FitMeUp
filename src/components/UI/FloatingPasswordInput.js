import { useState } from "react";
import { createStyles, PasswordInput, rem } from "@mantine/core";

const useStyles = createStyles((theme, { floating }) => ({
  root: {
    position: "relative",
    margin: rem(10),
  },

  label: {
    position: "absolute",
    zIndex: 2,
    top: rem(7),
    left: theme.spacing.sm,
    pointerEvents: "none",
    color: floating
      ? theme.colorScheme === "dark"
        ? theme.white
        : theme.black
      : theme.colorScheme === "dark"
      ? theme.colors.dark[3]
      : theme.colors.gray[5],
    transition: "transform 150ms ease, color 150ms ease, font-size 150ms ease",
    transform: floating ? `translate(-${theme.spacing.sm}, ${rem(-28)})` : "none",
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: "opacity 150ms ease",
    opacity: floating ? 1 : 0,
  },

  innerInput: {
    "&::placeholder": {
      transition: "color 150ms ease",
      color: !floating ? "transparent" : undefined,
    },
  },

  invalid: {
    backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba(theme.colors.red[8], 0.15) : theme.colors.red[0],
  },
}));

export function FloatingPasswordInput(props) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const { classes } = useStyles({
    floating: value.trim().length !== 0 || focused,
  });

  const onChangeInputHandler = (event) => {
    props.onChangeHandler(event);
    setValue(event.currentTarget.value);
  };

  return (
    <PasswordInput
      classNames={classes}
      label={props.label || "Password"}
      placeholder={props.placeholder || "Password"}
      required
      onChange={onChangeInputHandler}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      error={props.error}
      mt={props.mt}
      mb={props.mb}
      autoComplete="nope"
    />
  );
}
