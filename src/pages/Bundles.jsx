import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import Loader from "../component/Loader";





const Bundles = () => {
  const [bundles, setBundles] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${baseUrl}/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const bundlesData = data.filter((item) => item.type === "bundle");
        setBundles(bundlesData);

        const uniqueCategories = Array.from(
          new Set(bundlesData.map((bundle) => bundle.category))
        );
        setCategories(["All", ...uniqueCategories]);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Optionally fallback to staticBundles:
        // setBundles(staticBundles);
        // setCategories(["All", ...Array.from(new Set(staticBundles.map(b => b.category)))]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Helper: get lowest price from lengths array
  const getLowestPrice = (lengths) => {
    if (!lengths || lengths.length === 0) return 0;
    const prices = lengths
      .map((l) => l.price)
      .filter((p) => typeof p === "number" && p !== null);
    return prices.length ? Math.min(...prices) : 0;
  };

  const filteredBundles = bundles
    .filter((bundle) =>
      bundle.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((bundle) =>
      selectedCategory === "All" ? true : bundle.category === selectedCategory
    )
   

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto py-12">
      {/* Page Header */}
      <div className="text-center mb-10 py-5 text-white bg-black">
        <h1 className="text-3xl md:text-4xl font-bold">Hair Bundles</h1>
        <p className="mt-2">Explore our premium bundles collection.</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4">
        <input
          type="text"
          placeholder="Search bundles"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2"
        />
       
      </div>

      {/* Category Filter Buttons */}
      <div className="mb-8 flex flex-wrap gap-3 px-4">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded-sm border ${
            selectedCategory === "All"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
          key="all"
        >
          All
        </button>
        {categories
          .filter((cat) => cat !== "All")
          .map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-sm border ${
                selectedCategory === cat
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {cat}
            </button>
          ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {filteredBundles.length > 0 ? (
          filteredBundles.map((bundle) => (
            <ProductCard key={bundle.id} product={bundle} category />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No bundles found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Bundles;
