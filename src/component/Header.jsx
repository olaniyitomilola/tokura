import React, { useState } from "react";
import NavLink from "./NavLink";
import logo from "../assets/logo.png";
import { FaClipboardList, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../Context/CartContext";
import { useCurrency } from "../Context/CurrencyContext"; // import hook

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Wigs", path: "/wigs" },
  { name: "Bundles", path: "/bundles" },
];

const currencies = ["CAD", "USD", "GBP"];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { openCart } = useCart();

  const { currency, setCurrency } = useCurrency();

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <header className="bg-white text-black p-4 shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <img src={logo} alt="Logo" className="h-8" />

        <nav className="hidden lg:flex space-x-10 text-lg">
          {navLinks.map((link) => (
            <NavLink key={link.name} name={link.name} path={link.path} />
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <a href={"/order"} className="block py-1 lg:py-0 hover:underline">
            <button
              className="cursor-pointer text-black hover:text-gray-700"
              aria-label="MyOrders"
            >
              <FaClipboardList className="h-5 w-5" />
            </button>
          </a>

          <button
            onClick={openCart}
            className="cursor-pointer text-black hover:text-gray-700"
            aria-label="Cart"
          >
            <FaShoppingCart className="h-5 w-5" />
          </button>

          <button
            className="lg:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Currency selector */}
          <select
            value={currency}
            onChange={handleCurrencyChange}
            className="ml-4 border rounded px-2 py-1 text-sm cursor-pointer"
            aria-label="Select Currency"
          >
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isOpen && (
        <nav className="mt-4 lg:hidden flex flex-col space-y-2 text-lg">
          {navLinks.map((link) => (
            <NavLink key={link.name} name={link.name} path={link.path} />
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
