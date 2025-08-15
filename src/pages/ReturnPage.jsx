import React, { useEffect, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const ReturnPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const sessionId = searchParams.get("session_id");
  const baseUrl = import.meta.env.VITE_API_URL;
  const { clearCart } = useCart();

  useEffect(() => {
    if (!sessionId) return;

    fetch(`${baseUrl}/checkout/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email || "");
        if (data.status === "complete") {
          clearCart();
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId, clearCart, baseUrl]);

  if (status === "open") {
    return <Navigate to="/checkout" replace />;
  }

  if (status === "complete") {
    return (
      <section className="min-h-screen flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-2xl font-bold mb-4">🎉 Thank you for your order!</h1>
        <p className="mb-2">
          A confirmation email will be sent to <strong>{customerEmail}</strong>.
        </p>
        <p className="text-gray-600">
          If you have any questions, email{" "}
          <a href="mailto:orders@tokuraluxury.com" className="text-blue-600">
            orders@tokuraluxury.com
          </a>.
        </p>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="min-h-screen flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-2xl font-bold mb-4">⚠️ Something went wrong</h1>
        <p>Please contact support if the issue persists.</p>
      </section>
    );
  }

  // Loading state with spinner
  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm sm:text-base">
          Loading your order details...
        </p>
      </div>
    </section>
  );
};

export default ReturnPage;
