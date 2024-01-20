import { useNavigate } from "react-router-dom";
import { deleteUser } from "../utils/user-api";
import { notifications } from "@mantine/notifications";
import { ActionIcon, Table } from "@mantine/core";
import { Eye, Trash } from "@phosphor-icons/react";

export default function TableUser({ data = [] }) {
  const navigate = useNavigate();

  const onClickShow = (id) => () => {
    navigate(`/admin/users/${id}`);
  };

  const onClickDelete = (id) => async () => {
    try {
      const result = await deleteUser(id);
      notifications.show({
        message: result.message,
        color: "green",
      });
      navigate(0);
    } catch (e) {
      notifications.show({
        title: "error",
        message: e.message,
        color: "red",
      });
    }
  };

  const rows = data.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.phoneNumber}</Table.Td>
      <Table.Td>{user.Address}</Table.Td>
      <Table.Td>
        <ActionIcon
          color="red"
          variant="subtle"
          onClick={onClickDelete(user.id)}
        >
          <Trash size={16} />
        </ActionIcon>
        <ActionIcon variant="subtle" onClick={onClickShow(user.id)}>
          <Eye size={16} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table bg="white">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Phone Number</Table.Th>
          <Table.Th>Address</Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
