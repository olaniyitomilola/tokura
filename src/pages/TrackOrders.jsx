import React, { useState } from "react";

const TrackOrder = () => {
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const baseUrl = import.meta.env.VITE_API_URL;

      // clean inputs
      const cleanEmail = email.trim();
      let cleanOrderId = orderId.trim().toUpperCase();
      if (cleanOrderId.startsWith("#")) {
        cleanOrderId = cleanOrderId.slice(1);
      }

      const response = await fetch(
        `${baseUrl}/orders/track?orderId=${encodeURIComponent(
          cleanOrderId
        )}&email=${encodeURIComponent(cleanEmail)}`
      );

      if (!response.ok) {
        throw new Error("Order not found. Please check your details.");
      }

      const data = await response.json();
      setOrder(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = () => {
    if (!order) return null;

    switch (order.status) {
      case "paid":
        return (
          <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 animate-pulse">
            Processing...
          </span>
        );
      case "shipped":
        return (
          <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
            Shipped
          </span>
        );
      case "delivered":
        return (
          <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
            Delivered
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
            {order.status}
          </span>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Track Your Order
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Order ID</label>
          <input
            type="text"
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          {loading ? "Checking..." : "Track Order"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      {/* Order Details */}
      {order && (
        <div className="mt-8 border p-6 rounded-md bg-white shadow text-sm">
          {/* Status */}
          {/* Status */}
<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold break-words">
    Order #{order.orderId}
  </h3>
  {renderStatus()}
</div>

<p className="text-gray-600 text-sm sm:text-base mb-1">
  Placed on {new Date(order.createdAt).toLocaleDateString()}
</p>
<p className="text-gray-600 text-sm sm:text-base mb-4">{order.customerEmail}</p>

{/* Tracking Info - show if not "paid" and tracking exists */}
{order.status !== "paid" && order.tracking_number && order.tracking_url && (
  <div className="mb-4">
    <p className="text-sm sm:text-base text-gray-600">Tracking Number:</p>
    <a
      href={order.tracking_url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm sm:text-base font-medium text-blue-600 hover:underline break-words"
    >
      {order.tracking_number}
    </a>
  </div>
)}


          {/* Items */}
          <div className="divide-y border rounded-md">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between p-3">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    Size: {item.size}" × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  {item.currency.toUpperCase()} {item.price}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mt-4 font-semibold text-base">
            <span>Total</span>
            <span>
              {order.currency.toUpperCase()} {order.totalAmount}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
