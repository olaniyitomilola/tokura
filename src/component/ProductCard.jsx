import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrency } from "../Context/CurrencyContext"; // 🔥 Add this

const ProductCard = ({
  product,
  rental = false,
  fromPrice = true,
  fixedPrice = false,
  category = false,
  addToCart = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const { convertPrice, currency } = useCurrency(); // ✅ Use context

  // 🧠 Get the lowest available price from lengths
  const availableLengths = product.lengths?.filter(
    (l) => l.price !== null && l.stock > 0
  );
  const lowestPriceUSD = availableLengths?.length
    ? Math.min(...availableLengths.map((l) => l.price))
    : null;

  let priceLabel = "N/A";
  if (lowestPriceUSD) {
    const converted = convertPrice(lowestPriceUSD);
    const formattedPrice = new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(converted);

    if (rental) {
      priceLabel = `from ${formattedPrice} per day`;
    } else if (fixedPrice) {
      priceLabel = `${formattedPrice}`;
    } else {
      priceLabel = `from ${formattedPrice}`;
    }
  }

  return (
    <Link to={`/product/${product.id}`} state={{ product }} className="block">
      <div
        className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-60 object-cover"
        />

        {category && product.category && (
          <span className="absolute top-2 left-2 px-3 py-1 text-xs font-semibold text-white bg-black rounded-full z-10">
            {product.category}
          </span>
        )}

        <div className="p-4 text-center">
          <h4 className="text-lg font-medium">{product.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{priceLabel}</p>
        </div>

        {addToCart && hovered && (
          <button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black px-6 py-2 rounded-full transition-opacity cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              alert(`Added ${product.name} to cart!`);
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
