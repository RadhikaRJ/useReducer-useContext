import "./styles.css";

import { useCartContext } from "./cartContext";

export function Cart() {
  const {
    itemsInCart,
    wishList,
    totalCheckOutPrice,
    dispatch
  } = useCartContext();
  // console.log({ itemsInCart });

  return (
    <div style={{ display: "flex" }}>
      <div style={{ border: "1px solid black", margin: "1rem" }}>
        <h1>Cart List</h1>
        <p>Cart Total: {totalCheckOutPrice.sum}</p>
        {itemsInCart.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                border: "1px solid black",
                padding: "1rem",
                margin: "1rem"
              }}
            >
              <h2>{item.name}</h2>
              <p>{item.price}</p>
              <button
                style={{ margin: "1rem" }}
                onClick={() => dispatch({ type: "QUANTITY_INCREMENT", item })}
              >
                +
              </button>
              {item.quantity}
              <button
                style={{ margin: "1rem" }}
                onClick={() => {
                  dispatch({ type: "QUANTITY_DECREMENT", item });
                }}
              >
                -
              </button>
              <button
                style={{ margin: "1rem" }}
                onClick={() => dispatch({ type: "REMOVE", item })}
              >
                Remove
              </button>
              <button
                style={{ margin: "1rem" }}
                onClick={() => dispatch({ type: "ADD_WISHLIST", item })}
              >
                Add to WishList
              </button>
            </div>
          );
        })}
      </div>
      <div style={{ border: "1px solid black", margin: "1rem" }}>
        <h2>Wishlisted Items</h2>
        {wishList.map((item) => {
          return (
            <div key={item.id}>
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <Cart />
    </div>
  );
}
