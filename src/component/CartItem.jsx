import React from "react";
import { useCart } from "../Context/CartContext";
import { useCurrency } from "../Context/CurrencyContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { currency, convertPrice } = useCurrency();

  const handleIncrement = () => {
    updateQuantity(item.id, item.size, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.size, item.quantity - 1);
    } else {
      removeFromCart(item.id, item.size);
    }
  };

  // Format price with Intl.NumberFormat and convert price
  const formattedPrice = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(convertPrice(parseFloat(item.price)));

  return (
    <li className="flex items-center gap-4 justify-between border border-gray-300 rounded p-3">
      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
      />

      {/* Info: Name, size, price */}
      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-gray-500">{item.size}"</p>
        <p className="text-sm font-semibold text-gray-700">{formattedPrice}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecrement}
          className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
        >
          −
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={handleIncrement}
          className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
        >
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
