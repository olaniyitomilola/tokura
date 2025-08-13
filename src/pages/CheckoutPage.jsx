// src/pages/CheckoutPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "../component/CheckoutForm";

const CheckoutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Top navigation bar */}
      <div className="flex flex-col sm:flex-row items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-700 bg-white px-3 py-2 rounded shadow hover:bg-gray-100 transition text-sm sm:text-base"
        >
          ← Go Back Home
        </button>
        <h1 className="flex-1 text-center text-lg sm:text-2xl font-bold text-gray-900">
          Make Payment
        </h1>
        {/* Spacer to keep title centered on large screens */}
        <div className="w-24 sm:w-[128px]"></div>
      </div>

      {/* Payment form container */}
      <div className="lg:flex-row gap-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <CheckoutForm />
      </div>
    </div>
  );
};

export default CheckoutPage;
