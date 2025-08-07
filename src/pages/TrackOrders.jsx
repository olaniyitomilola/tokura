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
      const response = await fetch(`${baseUrl}/track-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, orderId }),
      });

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

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-semibold mb-6 text-center">Track Your Order</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Email Address</label>
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

        {/* Optional CAPTCHA placeholder */}
        {/* <div className="text-xs text-gray-500">CAPTCHA goes here</div> */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          {loading ? "Checking..." : "Track Order"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      {order && (
        <div className="mt-8 border p-4 rounded-md bg-gray-50 text-sm">
          <h3 className="font-semibold mb-2">Order Status: {order.status}</h3>
          <p className="mb-1">Order ID: {order.id}</p>
          <p className="mb-1">Date: {new Date(order.createdAt).toLocaleString()}</p>
          <p className="mb-2">Email: {order.email}</p>

          <h4 className="font-medium mt-4">Items:</h4>
          <ul className="list-disc list-inside">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.name} ({item.size}") – ${item.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
