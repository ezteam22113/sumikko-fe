import { useNavigate } from "react-router-dom";
import useGetData from "../../hooks/use-get-data";
import { deleteBrand, getBrands } from "../../utils/brand-api";
import { notifications } from "@mantine/notifications";
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
import { Eye, Plus, Trash } from "@phosphor-icons/react";
import EmptyLayout from "../../components/empty-layout";
import React from "react";

export default function BrandListPage({ type = "user" }) {
  const { data = [], isLoading } = useGetData(getBrands);
  const navigate = useNavigate();

  const isUser = type === "user";
  const onClickDetail = React.useCallback(
    (id) => () => {
      navigate(isUser ? `/brands/${id}` : `/admin/brands/${id}`);
    },
    [isUser, navigate]
  );

  const onDeleteBrand = React.useCallback(
    (id) => async () => {
      try {
        const result = await deleteBrand(id);
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

  if (isLoading) {
    return <LoadingLayout />;
  }

  if (data) {
    return (
      <DefaultLayout type={type}>
        <Space h={24} />
        <div style={{ minHeight: "100vh" }}>
          <Flex align="center" justify="space-between" m={16}>
            <Text fz={36} fw={700} c="white">
              Our Brands
            </Text>
            {!isUser && (
              <Button
                leftSection={<Plus size={16} />}
                onClick={() => navigate("/admin/brands/create")}
              >
                Add Brand
              </Button>
            )}
          </Flex>
          <SimpleGrid cols={6} m={16} spacing="xl">
            {data.data.map((brand) => (
              <Card
                key={brand.is}
                h={isUser ? 250 : 300}
                w={200}
                onClick={isUser ? onClickDetail(brand.id) : undefined}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Image w={200} h={150} src={brand.image} />
                <Text maw={200} ta="center" truncate="end">
                  {brand.name}
                </Text>
                {!isUser && (
                  <Button
                    color="red"
                    variant="subtle"
                    leftSection={<Trash size={16} />}
                    onClick={onDeleteBrand(brand.id)}
                  >
                    Delete Brand
                  </Button>
                )}
                <Button
                  leftSection={<Eye size={16} />}
                  onClick={onClickDetail(brand.id)}
                >
                  Show Brand
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
