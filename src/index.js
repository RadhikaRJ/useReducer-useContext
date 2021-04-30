import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { CartContextProvider } from "./cartContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </StrictMode>,
  rootElement
);
