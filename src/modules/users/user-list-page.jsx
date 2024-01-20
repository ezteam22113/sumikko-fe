import { Button, Container, Flex, Space, Text } from "@mantine/core";
import { DefaultLayout } from "../../components/default-layout";
import LoadingLayout from "../../components/loading-layout";
import useGetData from "../../hooks/use-get-data";
import { getUsers } from "../../utils/user-api";
import TableUser from "../../components/table-user";
import EmptyLayout from "../../components/empty-layout";
import { Plus } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export default function UserListPage() {
  const { data = [], isLoading } = useGetData(getUsers);
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingLayout />;
  }

  if (data) {
    const users = data.data;
    return (
      <DefaultLayout type="admin">
        <Space h={24} />
        <div style={{ minHeight: "100vh" }}>
          <Container>
            <Flex align="center" justify="space-between" m={16}>
              <Text fz={36} fw={700} c="white">
                User List
              </Text>
              <Button
                leftSection={<Plus size={16} />}
                onClick={() => navigate("/admin/users/create")}
              >
                Add User
              </Button>
            </Flex>
            <TableUser data={users} />
          </Container>
        </div>
      </DefaultLayout>
    );
  }

  return <EmptyLayout />;
}
