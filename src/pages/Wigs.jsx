import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import Loader from "../component/Loader";


const Wigs = () => {
  const [wigs, setWigs] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true); // <-- loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // start loading
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${baseUrl}/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const wigsData = data.filter((item) => item.type === "wig");
        setWigs(wigsData);

        const uniqueCategories = Array.from(
          new Set(wigsData.map((wig) => wig.category))
        );
        setCategories(["All", ...uniqueCategories]);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchProducts();
  }, []);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getLowestPrice = (lengths) => {
    const prices = lengths
      .map((l) => l.price)
      .filter((p) => typeof p === "number" && p !== null);
    return prices.length ? Math.min(...prices) : 0;
  };

  const filteredWigs = wigs
    .filter((wig) => {
      const matchesSearch = wig.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "All" || wig.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })

  if (loading) {
  return <Loader/>
}

  return (
    <div className="max-w-7xl mx-auto py-12">
      {/* Title */}
      <div className="text-center mb-10 py-5 text-white bg-black">
        <h1 className="text-3xl md:text-4xl font-bold">Ready-to-Wear Wigs</h1>
        <p className="mt-2">Explore our premium collection of stylish wigs.</p>
      </div>

      {/* Search + Filters */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-4 px-4">
        <input
          type="text"
          placeholder="Search wigs"
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

       

        <select
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Wig Grid */}
      {filteredWigs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {filteredWigs.map((wig) => (
            <ProductCard key={wig.id} product={wig} category />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No wigs found.</p>
      )}
    </div>
  );
};

export default Wigs;
