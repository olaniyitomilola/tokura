import { useEffect } from "react";
import { ThemeProvider } from "@material-tailwind/react";
import './index.css';

import Layout from "./layout/Layout";
import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./Context/CartContext";
import { CurrencyProvider } from "./Context/CurrencyContext";
import CartModal from "./component/CartModal";

function App() {
  useEffect(() => {
    const disableRightClick = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", disableRightClick);
    return () => document.removeEventListener("contextmenu", disableRightClick);
  }, []);

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <CartProvider>
          <AppRoutes />
          <CartModal />
        </CartProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;
