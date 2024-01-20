import { notifications } from "@mantine/notifications";
import React from "react";

export const CartContext = React.createContext({
  state: [],
  onAddCart: (payload) => {},
  onRemoveCart: (index) => {},
  onResetCart: () => {},
});

export function CartProvider({ children }) {
  const reducer = (state, action) => {
    const { payload } = action;

    switch (action.type) {
      case "add_cart":
        return [...state, payload];
      case "remove_cart":
        state.splice(payload.index, 1);
        return state;
      case "clear_cart":
        return [];
      default:
        return state;
    }
  };
  const [state, dispatch] = React.useReducer(reducer, []);

  const onAddCart = React.useCallback((payload) => {
    dispatch({ type: "add_cart", payload });
    notifications.show({
      title: "add cart",
      message: "add cart successsful",
    });
  }, []);

  const onRemoveCart = React.useCallback((index) => {
    dispatch({ type: "remove_cart", payload: { index } });
    notifications.show({
      title: "remove cart",
      message: "remove cart successsful",
    });
  }, []);

  const onResetCart = React.useCallback(() => {
    dispatch({ type: "reset_cart" });
  }, []);

  return (
    <CartContext.Provider
      value={{ onAddCart, onRemoveCart, onResetCart, state }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  return context;
}
