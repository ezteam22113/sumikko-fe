import React from "react";
import { useParams } from "react-router-dom";
import { getCollection } from "../../utils/collection-api";
import { notifications } from "@mantine/notifications";
import { useCart } from "../../hooks/use-cart";
import LoadingLayout from "../../components/loading-layout";
import { DefaultLayout } from "../../components/default-layout";
import { Button, Container, Flex, Image, Space, Text } from "@mantine/core";
import numeral from "numeral";
import { ShoppingCart } from "@phosphor-icons/react";
import EmptyLayout from "../../components/empty-layout";

export default function CollectionViewPage({ type = "user" }) {
  const query = useParams();
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function exec() {
      try {
        setIsLoading(true);
        const { id } = query;
        const collection = await getCollection(id);
        setData(collection);
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

  const { onAddCart } = useCart();

  if (isLoading) {
    return <LoadingLayout />;
  }

  if (data) {
    const collection = data.data;
    return (
      <DefaultLayout type={type} srcBackground={collection.image}>
        <div
          style={{
            minHeight: "100vh",
          }}
        >
          <Space h={24} />
          <Container>
            <Flex justify="center" direction="column" align="center" gap={16}>
              <Image w={200} h={200} src={collection.image} />
              <Text c="white" ta="center" fz={24} fw={700}>
                {collection.name} - {collection.Brand.name} - Rp
                {numeral(collection.price).format("0,0")}
              </Text>
              <Text c="white" fz={16}>
                {collection.description}
              </Text>
            </Flex>
            <Space h={24} />
            <Button
              fullWidth
              variant="default"
              leftSection={<ShoppingCart size={16} />}
              onClick={() => onAddCart(collection)}
            >
              Add Cart
            </Button>
          </Container>
        </div>
      </DefaultLayout>
    );
  }

  return <EmptyLayout />;
}
