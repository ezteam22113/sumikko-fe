import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { login } from "../../utils/auth-api";
import { notifications } from "@mantine/notifications";
import {
  BackgroundImage,
  Button,
  Card,
  Flex,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { putMe, putToken } from "../../utils/fetch";

export default function LoginPage({ type = "user" }) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState({
    email: "",
    password: "",
  });
  const isUser = type === "user";
  const { onSetAuth } = useAuth();

  const [isLoading, setIsLoading] = React.useState(false);

  const onLogin = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await login(value);
      onSetAuth(result.accessToken);
      putToken(result.accessToken);
      putMe(result.data);
      isUser ? navigate("/") : navigate("/admin");

      notifications.show({
        message: result.message,
        color: "green",
      });
    } catch (e) {
      //
      notifications.show({
        title: "error",
        message: e.message,
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  }, [value, setIsLoading, isUser, onSetAuth, navigate]);

  const onRegister = React.useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      mih="100vh"
      miw="100vw"
      bg="black"
    >
      <BackgroundImage
        pos="absolute"
        inset={0}
        opacity={0.5}
        src="https://images.unsplash.com/photo-1526743851649-2282229bac05?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGx1eHVyeSUyMHN0b3JlfGVufDB8fDB8fHww"
      />

      <Card withBorder miw={500} radius="sm" shadow="xs">
        <Text fz={24} fw={600} ta="center">
          Login
        </Text>
        <Flex direction="column" gap={16}>
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
            type="password"
            label="Password"
            placeholder="masukkan password"
            value={value.password}
            onChange={(e) => {
              setValue((prev) => ({ ...prev, password: e.target.value }));
            }}
            required
          />
          <Button onClick={onLogin} type="submit" loading={isLoading}>
            Login
          </Button>
          <Button variant="subtle" onClick={onRegister}>
            Register
          </Button>
        </Flex>
      </Card>
      <Flex
        direction="column"
        gap={16}
        maw={500}
        flex={1}
        pos="absolute"
        top="10vh"
        justify="center"
      >
        <Text fw={700} c="white" ta="center" fz={36}>
          Mau Belanja Barang Mewah? ke Sumikko aja
        </Text>
        <Text c="white" fw={700} ta="center" fz={24}>
          Sumikko Store - Toko Barang Mewah
        </Text>
      </Flex>
    </Flex>
  );
}
