import React from "react";
import { useParams } from "react-router-dom";
import { getBrand } from "../../utils/brand-api";
import { notifications } from "@mantine/notifications";
import LoadingLayout from "../../components/loading-layout";
import { DefaultLayout } from "../../components/default-layout";
import { Container, Flex, Image, Space, Text } from "@mantine/core";
import EmptyLayout from "../../components/empty-layout";

export default function BrandViewPage({ type = "user" }) {
  const query = useParams();
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function exec() {
      try {
        setIsLoading(true);
        const { id } = query;
        const brand = await getBrand(id);
        setData(brand);
      } catch (e) {
        notifications.show({
          color: "red",
          title: "error",
          message: e.message,
        });
      } finally {
        setIsLoading(false);
      }
    }
    exec();
  }, [query]);

  if (isLoading) {
    return <LoadingLayout />;
  }

  if (data) {
    const brand = data.data;
    return (
      <DefaultLayout type={type} srcBackground={brand.image}>
        <div
          style={{
            minHeight: "100vh",
          }}
        >
          <Space h={36} />
          <Container>
            <Flex direction="column" justify="center" align="center">
              <Image w={300} h={300} fit="cover" src={brand.image} />
              <Text fz={48} c="white" fw={700}>
                {brand.name}
              </Text>
              <Text fz={18} c="white">
                {brand.description}
              </Text>
            </Flex>
          </Container>
        </div>
      </DefaultLayout>
    );
  }

  return <EmptyLayout />;
}
