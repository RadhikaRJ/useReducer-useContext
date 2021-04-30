import { createContext, useContext, useReducer } from "react";
import { itemsInCart } from "./data";

export const wishList = [
  {
    id: 4,
    name: "japani joota",
    price: 1000,
    quantity: 1
  }
];
export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { itemsInCart, wishList });

  const totalCheckOutPrice = state.itemsInCart.reduce(cartTotalAmount, {
    sum: 0
  });
  function cartTotalAmount(acc, value) {
    return { sum: acc.sum + value.price * value.quantity };
  }

  return (
    <CartContext.Provider
      value={{
        itemsInCart: state.itemsInCart,
        wishList: state.wishList,
        totalCheckOutPrice,
        dispatch
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}

function cartReducer(state, action) {
  switch (action.type) {
    case "QUANTITY_INCREMENT":
      return {
        itemsInCart: state.itemsInCart.map((item) => {
          if (item.id === action.item.id) {
            return { ...action.item, quantity: action.item.quantity + 1 };
          }
          return item;
        }),

        wishList: state.wishList
      };

      break;

    case "QUANTITY_DECREMENT":
      return {
        itemsInCart: state.itemsInCart.map((item) => {
          if (item.id === action.item.id) {
            if (action.item.quantity !== 0) {
              return { ...item, quantity: item.quantity - 1 };
            }
          }
          return item;
        }),

        wishList: state.wishList
      };
      break;

    case "REMOVE":
      return {
        itemsInCart: state.itemsInCart.filter(
          (item) => action.item.id !== item.id
        ),

        wishList: state.wishList
      };
      break;

    case "ADD_WISHLIST":
      return {
        itemsInCart: state.itemsInCart,

        wishList: state.wishList.concat(action.item)
      };
    default:
      return state;
  }
}
