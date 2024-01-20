import { useNavigate } from "react-router-dom";
import useGetData from "../../hooks/use-get-data";
import React from "react";
import { deleteCollection, getCollections } from "../../utils/collection-api";
import { notifications } from "@mantine/notifications";
import { useCart } from "../../hooks/use-cart";
import LoadingLayout from "../../components/loading-layout";
import { DefaultLayout } from "../../components/default-layout";
import {
  Button,
  Card,
  Flex,
  Image,
  SimpleGrid,
  Space,
  Text,
} from "@mantine/core";
import EmptyLayout from "../../components/empty-layout";
import { Eye, Plus, ShoppingCart, Trash } from "@phosphor-icons/react";
import numeral from "numeral";

export default function CollectionListPage({ type = "user" }) {
  const { data, isLoading } = useGetData(getCollections);
  const navigate = useNavigate();

  const isUser = type === "user";

  const onClickDetail = React.useCallback(
    (id) => () => {
      navigate(isUser ? `/collections/${id}` : `/admin/collections/${id}`);
    },
    [navigate, isUser]
  );

  const onDeleteCollection = React.useCallback(
    (id) => async () => {
      try {
        const result = await deleteCollection(id);
        notifications.show({
          message: result.message,
        });
        navigate(0);
      } catch (e) {
        notifications.show({
          message: e.message,
          title: "error",
          color: "red",
        });
      }
    },
    [navigate]
  );

  const { onAddCart } = useCart();

  if (isLoading) {
    return <LoadingLayout />;
  }

  if (data) {
    const collections = data.data;
    return (
      <DefaultLayout type={type}>
        <Space h={24} />
        <div
          style={{
            minHeight: "100vh",
          }}
        >
          <Flex align="center" justify="space-between" m={16}>
            <Text fz={36} fw={700} c="white">
              Our Collections
            </Text>
            {!isUser && (
              <Button
                leftSection={<Plus size={16} />}
                onClick={() => navigate("/admin/collections/create")}
              >
                Add Collection
              </Button>
            )}
          </Flex>
          <SimpleGrid cols={4} p={16} spacing="xl">
            {collections.length === 0 && <EmptyLayout />}
            {collections.map((collection) => (
              <Card
                key={collection.id}
                bg="black"
                withBorder
                shadow="sm"
                radius="lg"
                style={{ overflow: "hidden" }}
                padding={0}
                h={455}
              >
                <Image w={345} h={320} src={collection.image} fit="cover" />
                <Text
                  mx={8}
                  ta="center"
                  c="white"
                  truncate="end"
                  fz={24}
                  fw={700}
                >
                  {collection.name}
                </Text>
                <Text c="white" ta="center">
                  Rp {numeral(collection.price).format("0,0")}
                </Text>
                {isUser ? (
                  <Button
                    variant="subtle"
                    leftSection={<ShoppingCart size={16} />}
                    onClick={() => onAddCart(collection)}
                  >
                    Add Cart
                  </Button>
                ) : (
                  <Button
                    color="red"
                    variant="subtle"
                    leftSection={<Trash size={16} />}
                    onClick={onDeleteCollection(collection.id)}
                  >
                    Delete Collection
                  </Button>
                )}
                <Button
                  leftSection={<Eye size={16} />}
                  onClick={onClickDetail(collection.id)}
                >
                  Show Product
                </Button>
              </Card>
            ))}
          </SimpleGrid>
        </div>
      </DefaultLayout>
    );
  }

  return <EmptyLayout />;
}
