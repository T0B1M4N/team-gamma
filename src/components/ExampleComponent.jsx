import React from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";

const ExampleComponent = () => {
  const { t } = useTranslation();
  const { addItem, items } = useCart();

  return (
    <div>
      <h1>{t("add_to_cart")}</h1>
      <button onClick={() => addItem({ id: "1", name: "Test", price: 100, quantity: 1 })}>
        {t("add_to_cart")}
      </button>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
};

export default ExampleComponent;
