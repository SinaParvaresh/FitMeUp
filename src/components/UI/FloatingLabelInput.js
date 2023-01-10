import { useState } from "react";
import { TextInput, createStyles, PasswordInput } from "@mantine/core";

const useStyles = createStyles((theme, { floating }, props) => ({
  root: {
    position: "relative",
    margin: 16,
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
}));

export function FloatingLabelInput(props) {
  const [isPassword, setIsPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const { classes } = useStyles({ floating: value.trim().length !== 0 || focused }, props);

  const onChangeInputHandler = (event) => {
    props.onChangeHandler(event);
    setValue(event.currentTarget.value);
    setIsPassword(props.innerRef.current.placeholder === "Password");
    // console.log(props.innerRef.current.placeholder);
    // console.log("Change input Handler called!");
  };

  if (isPassword) {
    return (
      <PasswordInput
        label={props.label}
        placeholder={props.placeholder}
        required
        classNames={classes}
        onChange={onChangeInputHandler}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        ref={props.innerRef}
        mt="md"
        autoComplete="nope"
      />
    );
  }

  return (
    <TextInput
      label={props.label}
      placeholder={props.placeholder}
      type={props.type}
      required
      classNames={classes}
      description={props.description}
      onChange={onChangeInputHandler}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      ref={props.innerRef}
      mt="md"
      autoComplete="nope"
    />
  );
}
