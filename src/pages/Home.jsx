import React, { useEffect,useState } from "react";
import ProductGrid from "../component/ProductGrid"; // adjust path if needed

import CarouselWithContent from "../component/CarouselWithContent";


const Home = () => {
  const [wigs, setWigs] = useState([]);
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${baseUrl}/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Filter and limit results to 4 items each
        const wigsData = data.filter(item => item.type === "wig").slice(0, 4);
        const bundlesData = data.filter(item => item.type === "bundle").slice(0, 4);

        setWigs(wigsData);
        setBundles(bundlesData);

        console.log("Wigs:", wigsData);
        console.log("Bundles:", bundlesData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

   useEffect(() => {
    const trackVisit = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        await fetch(`${baseUrl}/vis`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ timestamp: new Date().toISOString() }),
        });
      } catch (error) {
        console.error("Failed to track visit:", error);
      }
    };

    trackVisit();
  }, []);

  return (
    <div>
      <CarouselWithContent />
      <ProductGrid title="Ready-to-Wear Wigs" products={wigs} />
      <ProductGrid title="Luxury Bundles Collection" products={bundles} />
    </div>
  );
};
export default Home;
