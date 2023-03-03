import { Skeleton, rem } from "@mantine/core";

const UserLoadingPage = () => {
  return (
    <>
      <Skeleton height={rem(50)} circle mb="xl" />
      <Skeleton height={rem(20)} radius="xl" />
      <Skeleton height={rem(20)} mt={rem(10)} radius="xl" />
      <Skeleton height={rem(20)} mt={rem(10)} width="70%" radius="xl" />
    </>
  );
};

export default UserLoadingPage;
