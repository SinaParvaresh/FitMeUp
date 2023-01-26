import { Select } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import React from "react";

const CalorieGoal = () => {
  return (
    <Select
      label="What is your current goal?"
      placeholder="Pick one"
      rightSection={<IconChevronDown size={14} />}
      rightSectionWidth={30}
      styles={{ rightSection: { pointerEvents: "none" } }}
      data={["Maintain Weight", "Lean Bulk", "Lose Weight"]}
      withAsterisk
    />
  );
};

export default CalorieGoal;
