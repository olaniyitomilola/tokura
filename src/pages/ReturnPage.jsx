import React, { useEffect, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
        const baseUrl = import.meta.env.VITE_API_URL;


const ReturnPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  const { clearCart } = useCart();

  useEffect(() => {
    if (!sessionId) return;

    const fetchSessionStatus = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/session-status?session_id=${sessionId}`
        );
        if (!res.ok) throw new Error("Failed to fetch session status");

        const data = await res.json();
        setStatus(data.status);
        setCustomerEmail(data.customer_email || "");

        if (data.status === "complete") {
          clearCart();
        }
      } catch (err) {
        console.error("Error fetching session status:", err);
        setStatus("error");
      }
    };

    fetchSessionStatus();
  }, [sessionId, clearCart]);

  if (status === "open") {
    return <Navigate to="/checkout" replace />;
  }

  if (status === "complete") {
    return (
      <section className="min-h-screen flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-2xl font-bold mb-4">🎉 Thank you for your order!</h1>
        <p className="mb-2">
          A confirmation email will be sent to{" "}
          <strong>{customerEmail}</strong>.
        </p>
        <p className="text-gray-600">
          If you have any questions, email{" "}
          <a
            href="mailto:orders@example.com"
            className="text-blue-600 underline"
          >
            orders@example.com
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

  return (
    <section className="min-h-screen flex justify-center items-center">
      <p>Loading your order details...</p>
    </section>
  );
};

export default ReturnPage;
