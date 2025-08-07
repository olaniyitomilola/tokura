import React, { useState } from "react";
import ProductCard from "../component/ProductCard";
import one from '../assets/image/1.JPG';
import two from '../assets/image/2.JPG';
import three from '../assets/image/3.JPG';

const accessories = [
  { id: 1, name: "Wig Stand", price: 15.99, img: one, category: "Maintenance" },
  { id: 2, name: "Edge Control Brush", price: 5.5, img: two, category: "Styling" },
  { id: 3, name: "Hair Bonnet", price: 9.99, img: three, category: "Care" },
  { id: 4, name: "Lace Glue", price: 12.99, img: one, category: "Styling" },
  { id: 5, name: "Silk Scarf", price: 7.5, img: two, category: "Care" },
];

// Extract unique categories
const categories = [...new Set(accessories.map((item) => item.category))];

const Accessories = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredAccessories = accessories
    .filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(item =>
      selectedCategory === "All" ? true : item.category === selectedCategory
    )
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Hair Accessories</h1>
        <p className="text-gray-600 mt-2">Everything you need to care for and style your wigs.</p>
      </div>

      {/* Search & Sort */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search accessories"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded-full border ${
            selectedCategory === "All" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAccessories.map((item) => (
          <ProductCard key={item.id} product={item} addToCart fixedPrice={true} />
        ))}
      </div>
    </div>
  );
};

export default Accessories;
