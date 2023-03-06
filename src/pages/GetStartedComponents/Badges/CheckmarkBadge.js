import { Badge } from "@mantine/core";
import { IconCheck } from "@tabler/icons";

const CheckmarkBadge = () => {
  const checkMark = <IconCheck style={{ marginTop: 3 }} size={15} />;

  return (
    <Badge sx={{ paddingLeft: 3 }} color="teal" size="sm" variant="outline" leftSection={checkMark}>
      Done
    </Badge>
  );
};

export default CheckmarkBadge;
