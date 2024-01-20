import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getUser, updateUser } from "../../utils/user-api";
import { notifications } from "@mantine/notifications";
import { DefaultLayout } from "../../components/default-layout";
import {
  Button,
  Card,
  Container,
  Flex,
  PasswordInput,
  Space,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { ArrowLeft } from "@phosphor-icons/react";

export default function UserCreatePage({ type = "create" }) {
  const navigate = useNavigate();
  const back = React.useCallback(() => navigate(-1), [navigate]);
  const query = useParams();
  const [isLoading, setIsLoading] = React.useState(false);

  const [value, setValue] = React.useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const isCreate = type === "create";

  const onSubmit = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const result = isCreate
        ? await createUser(value)
        : await updateUser(query.id, value);
      notifications.show({
        color: "green",
        message: result.message,
      });
      back();
    } catch (e) {
      notifications.show({
        color: "red",
        title: "error",
        message: e.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, [value, isCreate, query.id, back]);

  React.useEffect(() => {
    async function exec() {
      try {
        setIsLoading(true);
        const { id } = query;
        const user = await getUser(id);
        setValue(user.data);
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
    !isCreate && exec();
  }, [isCreate, query]);

  return (
    <>
      <DefaultLayout type="admin">
        <div
          style={{
            minHeight: "100vh",
          }}
        >
          <Space h={36} />
          <Container>
            <Card>
              <Text ta="center" fw={700} fz={24}>
                {isCreate ? "Tambah User" : "Edit User"}
              </Text>
              <Space h={24} />
              <Flex direction="column" gap={8}>
                <TextInput
                  label="Nama"
                  placeholder="masukkan nama"
                  value={value.name}
                  onChange={(e) => {
                    setValue((prev) => ({ ...prev, name: e.target.value }));
                  }}
                  required
                />
                <TextInput
                  label="Email"
                  placeholder="masukkan email"
                  value={value.email}
                  onChange={(e) => {
                    setValue((prev) => ({ ...prev, email: e.target.value }));
                  }}
                  required
                />
                <PasswordInput
                  label="Password"
                  placeholder="masukkan password"
                  value={value.password}
                  onChange={(e) => {
                    setValue((prev) => ({ ...prev, password: e.target.value }));
                  }}
                  required
                />
                <TextInput
                  label="Phone Number"
                  placeholder="Contoh: +6281234567891012"
                  value={value.phoneNumber}
                  onChange={(e) => {
                    setValue((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }));
                  }}
                  required
                />
                <Textarea
                  label="Address"
                  placeholder="masukkan alamat"
                  value={value.address}
                  onChange={(e) => {
                    setValue((prev) => ({ ...prev, address: e.target.value }));
                  }}
                  required
                />
              </Flex>
              <Space h={24} />

              <Button type="submit" loading={isLoading} onClick={onSubmit}>
                Simpan
              </Button>
              <Space h={8} />
              <Button
                leftSection={<ArrowLeft size={16} />}
                color="red"
                onClick={back}
              >
                Kembali
              </Button>
            </Card>
          </Container>
        </div>
      </DefaultLayout>
    </>
  );
}
