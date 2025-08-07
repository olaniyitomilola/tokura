import React, { createContext, useState, useEffect, useContext } from "react";

const countryToCurrency = {
  CA: "CAD",
  US: "USD",
  GB: "GBP",
};

const CurrencyContext = createContext();

// CAD is the base currency
const fixedRates = {
  CAD: 1,
  USD: 0.73, // 1 CAD = 0.80 USD
  GBP: 0.54, // 1 CAD = 0.60 GBP
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("currency") || "CAD";
  });

  const [rates, setRates] = useState(fixedRates);

  useEffect(() => {
    if (!localStorage.getItem("currency")) {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          const detectedCurrency = countryToCurrency[data.country_code] || "CAD";
          setCurrency(detectedCurrency);
          localStorage.setItem("currency", detectedCurrency);
        })
        .catch(() => {
          setCurrency("CAD");
          localStorage.setItem("currency", "CAD");
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const convertPrice = (priceInCAD) => {
    const rate = rates[currency] || 1;
    return priceInCAD * rate;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
