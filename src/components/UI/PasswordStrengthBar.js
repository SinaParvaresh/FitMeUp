import { Box, Progress, Group, Text, Center, Stack } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";
import { FloatingPasswordInput } from "./FloatingPasswordInput";

function PasswordRequirement({ meets, label }) {
  return (
    <Text color={meets ? "teal" : "red"} mt={5} size="sm">
      <Center inline>
        {meets ? <IconCheck size={14} stroke={1.5} /> : <IconX size={14} stroke={1.5} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password, confirmPassword) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  if (confirmPassword !== password || password.length === 0) {
    multiplier += 1;
  }

  return Math.max(100 - (100 / (requirements.length + 2)) * multiplier, 0);
}

export function PasswordStrengthBar(props) {
  let { value } = props;
  let { confirmPasswordValue } = props;
  let progressValue = value.length > 0 && confirmPasswordValue === value;

  const strength = getStrength(value, confirmPasswordValue);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));

  const bars = Array(6)
    .fill(0)
    .map((_, index) => (
      <Progress
        value={progressValue && index === 0 ? 100 : strength >= ((index + 1) / 7) * 100 ? 100 : 0}
        color={strength > 99 ? "teal" : strength > 50 ? "yellow" : "red"}
        key={index}
        size={4}
      />
    ));

  return (
    <div>
      <Stack spacing="xs">
        <FloatingPasswordInput
          label={props.firstLabel}
          placeholder={props.firstPlaceholder}
          mt="md"
          onChangeHandler={props.onChangeHandler}
        />
        <FloatingPasswordInput
          label={props.secondLabel}
          placeholder={props.secondPlaceholder}
          mt="md"
          onChangeHandler={props.onConfirmPasswordHandler}
        />
      </Stack>

      <Group spacing={5} grow mt="xs" mb="md">
        {bars}
      </Group>

      <PasswordRequirement label="Has at least 6 characters" meets={value.length > 5} />
      {checks}
      <PasswordRequirement label="Passwords match" meets={value === confirmPasswordValue && value} />
    </div>
  );
}
