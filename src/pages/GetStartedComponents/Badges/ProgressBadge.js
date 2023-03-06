import { Badge } from "@mantine/core";
import { IconLoader } from "@tabler/icons";

const ProgressBadge = () => {
  const inProgress = <IconLoader style={{ marginTop: 3 }} size={15} />;

  return (
    <Badge sx={{ paddingLeft: 3 }} color="yellow" size="sm" variant="outline" leftSection={inProgress}>
      In progress
    </Badge>
  );
};

export default ProgressBadge;
