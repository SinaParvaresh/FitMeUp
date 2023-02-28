import { Badge } from "@mantine/core";
import { IconCodeOff } from "@tabler/icons";

const NotStartedBadge = () => {
  const notStarted = <IconCodeOff style={{ marginTop: 3 }} size={15} />;

  return (
    <Badge sx={{ paddingLeft: 3 }} color="red" size="sm" variant="outline" leftSection={notStarted}>
      Not started
    </Badge>
  );
};

export default NotStartedBadge;
