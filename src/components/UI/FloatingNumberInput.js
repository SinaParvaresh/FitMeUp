import { useState } from "react";
import { createStyles, NumberInput } from "@mantine/core";

const useStyles = createStyles((theme, { floating }) => ({
  root: {
    position: "relative",
    marginBottom: 10,
    marginTop: 50,
  },

  label: {
    position: "absolute",
    zIndex: 2,
    top: 7,
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
    transform: floating ? `translate(-${theme.spacing.sm}px, -28px)` : "none",
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: "opacity 150ms ease",
    opacity: floating ? 1 : 0,
  },

  input: {
    "&::placeholder": {
      transition: "color 150ms ease",
      color: !floating ? "transparent" : undefined,
    },
  },
  invalid: {
    backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba(theme.colors.red[8], 0.15) : theme.colors.red[0],
  },

  icon: {
    color: theme.colors.red[theme.colorScheme === "dark" ? 7 : 6],
  },
}));

export function FloatingNumberInput(props) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(props.value);
  const { classes } = useStyles({
    floating: !isNaN(value) || props.error || focused,
  });

  const onChangeInputHandler = (event) => {
    props.onChangeHandler(event);
    setValue(event);
  };

  return (
    <NumberInput
      classNames={classes}
      label={props.label}
      placeholder={props.placeholder}
      precision={props.precision}
      required
      description={props.description}
      value={props.value}
      validation={props.validationCheck}
      onChange={onChangeInputHandler}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      error={props.error}
      mt="md"
      autoComplete="nope"
    />
  );
}
