import { Flex, Image, Space, Text } from "@mantine/core";
import { DefaultLayout } from "./default-layout";

export default function EmptyLayout() {
  return (
    <DefaultLayout>
      <Flex
        w="100vw"
        h="100vh"
        justify="center"
        direction="column"
        align="center"
      >
        <Image src="/empty-data.svg" w={600} h={600} fit="cover" />
        <Space h={24} />
        <Text ta="center" c="white" fz={36} fw={700}>
          Data Not Found
        </Text>
      </Flex>
    </DefaultLayout>
  );
}
