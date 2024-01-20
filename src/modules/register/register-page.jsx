import React from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../utils/auth-api";
import { notifications } from "@mantine/notifications";
import {
  BackgroundImage,
  Button,
  Card,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [value, setValue] = React.useState({
    email: "",
    password: "",
    name: "",
    password_confirmation: "",
    phoneNumber: "",
    address: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onRegister = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await register(value);
      navigate("/login");
      notifications.show({
        message: result.message,
        color: "green",
      });
    } catch (e) {
      notifications.show({
        title: "error",
        message: e.message,
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  }, [value, setIsLoading, navigate]);

  const onLogin = React.useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <Flex miw="100vw" mih="100vh" justify="center" bg="black">
      <BackgroundImage
        pos="absolute"
        inset={0}
        opacity={0.35}
        style={{}}
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvcmV8ZW58MHx8MHx8fDA%3D"
      />
      <Card
        pos="absolute"
        top={0}
        left={0}
        bottom={0}
        withBorder
        miw={500}
        radius="sm"
        shadow="xs"
      >
        <Flex direction="column" gap={16}>
          <Text fz={24} fw={600} ta="center">
            Register
          </Text>
          <TextInput
            type="text"
            label="Nama"
            placeholder="masukkan nama anda"
            value={value.name}
            onChange={(e) => {
              setValue((prev) => ({ ...prev, name: e.target.value }));
            }}
            required
          />
          <TextInput
            type="email"
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
            type="password"
            placeholder="masukkan password"
            value={value.password}
            onChange={(e) => {
              setValue((prev) => ({ ...prev, password: e.target.value }));
            }}
            required
          />
          <PasswordInput
            type="password"
            label="Konfirmasi Password"
            placeholder="Masukkan Konfirmasi Password"
            value={value.password_confirmation}
            onChange={(e) => {
              setValue((prev) => ({
                ...prev,
                password_confirmation: e.target.value,
              }));
            }}
            required
          />
          <TextInput
            type="text"
            label="Nomor Telepon"
            placeholder="Contoh: +621234567891012"
            value={value.phoneNumber}
            onChange={(e) => {
              setValue((prev) => ({ ...prev, phoneNumber: e.target.value }));
            }}
            required
          />
          <Textarea
            label="Alamat Rumah"
            placeholder="masukkan alamat rumah anda"
            value={value.address}
            onChange={(e) => {
              setValue((prev) => ({ ...prev, address: e.target.value }));
            }}
            required
          />
          <Button onClick={onRegister} type="submit" loading={isLoading}>
            Register
          </Button>
          <Button variant="subtle" onClick={onLogin}>
            Login
          </Button>
        </Flex>
      </Card>
      <Flex
        direction="column"
        gap={16}
        maw={500}
        flex={1}
        pos="absolute"
        top="40vh"
        right="25vw"
        justify="center"
      >
        <Text fw={700} c="white" fz={36}>
          Mau Belanja Barang Mewah? ke Sumikko aja
        </Text>
        <Text c="white" fw={700} fz={24}>
          Sumikko Store - Toko Barang Mewah
        </Text>
      </Flex>
    </Flex>
  );
}
