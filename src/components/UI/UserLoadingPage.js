import { Skeleton } from "@mantine/core";

const UserLoadingPage = () => {
  return (
    <>
      <Skeleton height={50} circle mb="xl" />
      <Skeleton height={20} radius="xl" />
      <Skeleton height={20} mt={10} radius="xl" />
      <Skeleton height={20} mt={10} width="70%" radius="xl" />
    </>
  );
};

export default UserLoadingPage;
