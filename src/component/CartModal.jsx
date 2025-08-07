import React from "react";
import { X } from "lucide-react";
import { useCart } from "../Context/CartContext";
import CartItem from "./CartItem";
import { useCurrency } from "../Context/CurrencyContext";

const formatPrice = (amount, currency) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

const CartModal = () => {
  const { cart = [], isOpen, closeCart } = useCart();
  const { currency, convertPrice } = useCurrency();

  // Calculate total price in selected currency
  const totalPrice = cart.reduce(
    (sum, item) => sum + convertPrice(parseFloat(item.price)) * item.quantity,
    0
  );

  return (
    <div
      className={`select-none fixed top-0 right-0 z-50 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={closeCart}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 overflow-y-auto flex-1">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-sm">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                currency={currency}
                convertPrice={convertPrice}
                formatPrice={formatPrice}
              />
            ))}
          </ul>
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between mb-4 font-semibold text-lg">
            <span>Total:</span>
            <span>{formatPrice(totalPrice, currency)}</span>
          </div>
          <button
            onClick={() => alert("Proceed to checkout")}
            className="cursor-pointer w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartModal;
