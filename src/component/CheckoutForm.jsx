// src/components/CheckoutForm.jsx
import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCart } from "../Context/CartContext";
import { useCurrency } from "../Context/CurrencyContext";

const stripePromise =  loadStripe(import.meta.env.VITE_TEST_KEY); 
        const baseUrl = import.meta.env.VITE_API_URL;


const CheckoutForm = () => {
  const { cart } = useCart();
  const { currency, convertPrice } = useCurrency();

  // Create checkout session
  const fetchClientSecret = useCallback(() => {
    return fetch(`${baseUrl}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.map((item) => ({
          name: item.name,
          image: item.image,
          price: convertPrice(parseFloat(item.price)),
          quantity: item.quantity,
          size: item.size,
        })),
        currency,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [cart, currency, convertPrice]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;
