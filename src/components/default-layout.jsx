import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useCart } from "../hooks/use-cart";
import React from "react";
import {
  BackgroundImage,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Text,
} from "@mantine/core";
import { ShoppingCart, SignIn, SignOut, User } from "@phosphor-icons/react";

export function DefaultLayout({
  children,
  srcBackground = "https://cdn.pixabay.com/photo/2015/02/27/23/13/department-store-652951_1280.jpg",
  type = "user",
}) {
  const isUser = type === "user";
  const { auth, onSetAuth } = useAuth();
  const { onResetCart } = useCart();

  const navigate = useNavigate();

  const onClickLink = React.useCallback(
    (link) => () => {
      navigate(link);
    },
    [navigate]
  );

  const onSignOut = React.useCallback(() => {
    onSetAuth("");
    onResetCart();
    localStorage.clear();
  }, [onSetAuth, onResetCart]);

  const showNavigation = (!isUser && auth) || isUser;

  return (
    <Container mih="100vh" miw="100vw" bg="black" p={0}>
      <BackgroundImage
        src={srcBackground}
        pos="fixed"
        opacity={0.15}
        inset={0}
      />
      <div
        style={{
          minHeight: 57,
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          background: "white",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 16,
          zIndex: 2,
          paddingRight: 16,
          backgroundColor: "black",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
      >
        <Image
          src="/sumikko.png"
          w={83}
          h={46}
          fit="contain"
          onClick={onClickLink(isUser ? "/" : "/admin")}
          style={{ cursor: "pointer" }}
        />
        <Flex direction="row" gap={16} align="center">
          {showNavigation && (
            <>
              <Button
                variant="subtle"
                onClick={onClickLink(
                  isUser ? "/collections" : "/admin/collections"
                )}
              >
                Product
              </Button>
              <Button
                variant="subtle"
                onClick={onClickLink(isUser ? "/brands" : "/admin/brands")}
              >
                Brand
              </Button>
              {!isUser && (
                <Button variant="subtle" onClick={onClickLink("/admin/users")}>
                  User
                </Button>
              )}
            </>
          )}
          {auth ? (
            <>
              {isUser && (
                <Button
                  leftSection={<ShoppingCart size={16} />}
                  variant="outline"
                >
                  Cart
                </Button>
              )}
              <Button
                variant="subtle"
                onClick={onSignOut}
                c="red"
                leftSection={<SignOut size={16} />}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={onClickLink("/login")}
                leftSection={<SignIn size={16} />}
              >
                Login
              </Button>
              <Button
                onClick={onClickLink("/register")}
                leftSection={<User size={16} />}
                variant="outline"
              >
                Register
              </Button>
            </>
          )}
        </Flex>
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>
      <div
        style={{
          minHeight: 57,
          paddingLeft: 16,
          zIndex: 2,
          paddingRight: 16,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Center>
          <Text c="white">
            &copy; 2023 PT Sumikko Luxury Brand Indonesia. All rights reserved
          </Text>
        </Center>
      </div>
    </Container>
  );
}
