import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TopBar from "./TopBar.jsx";
import SideBar from "./SideBar.jsx";
import Products from "./products.jsx";
import BottomBar from "./BottomBar.jsx";
import Cart from "./cart.jsx";
import CurProduct from "./CurrentProduct.jsx";
import { AppWrapper } from "./AppContext"; // <-- import the provider component

function App() {
  return (
    <>
      <TopBar />
      <SideBar />
      <Products />
      <Cart />
      <CurProduct />
      <BottomBar />
    </>
  );
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  <StrictMode>
    <AppWrapper> {/* Wrap your whole app in context */}
      <App />
    </AppWrapper>
  </StrictMode>
);
