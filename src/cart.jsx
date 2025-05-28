import React from "react";
import { useAppContext } from "./AppContext";
import "./cart.css"; // 👈 make sure you import the CSS file

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useAppContext();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart" id="cartDiv">
      <h2>🛒 Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="emptyMessage">Your cart is empty.</p>
      ) : (
        <div className="cartList">
          {cartItems.map((item) => (
            <div key={item.id} className="cartItem">
              <div className="itemInfo">
                <p className="itemTitle">{item.title}</p>
                <p className="itemPrice">${item.price.toFixed(2)}</p>
              </div>
              <div className="itemControls">
                <input
                  type="number"
                  className="itemQty"
                  value={item.quantity}
                  min={1}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value, 10))
                  }
                />
                <button className="removeBtn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <hr />
          <div className="totalSection">
            <p className="totalLabel">Total:</p>
            <p className="totalPrice">${totalPrice.toFixed(2)}</p>
          </div>
          <button className="clearCartBtn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
