import { Container, Space, Text } from "@mantine/core";
import { DefaultLayout } from "../../components/default-layout";
import LoadingLayout from "../../components/loading-layout";
import useGetData from "../../hooks/use-get-data";
import { getUsers } from "../../utils/user-api";
import TableUser from "../../components/table-user";
import EmptyLayout from "../../components/empty-layout";

export default function UserListPage() {
  const { data = [], isLoading } = useGetData(getUsers);

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
            <Text fz={36} fw={700} c="white" m={16}>
              User List
            </Text>
            <TableUser data={users} />
          </Container>
        </div>
      </DefaultLayout>
    );
  }

  return <EmptyLayout />;
}
