import React, { useState } from "react";
import ProductCard from "../component/ProductCard";
import one from '../assets/image/1.JPG';
import two from '../assets/image/2.JPG';
import three from '../assets/image/3.JPG';
import four from '../assets/image/4.JPG';
import five from '../assets/image/5.JPG';

const rentalWigs = [
  { id: 1, name: "Curly Wig", price: 89.99, img: one },
  { id: 2, name: "Straight Wig", price: 99.99, img: two },
  { id: 3, name: "Bob Cut", price: 75.5, img: three },
  { id: 4, name: "Blonde Wig", price: 110, img: four },
  { id: 5, name: "Afro Wig", price: 82.0, img: five },
  { id: 6, name: "Layered Wig", price: 95.0, img: one },
  { id: 7, name: "Pixie Cut", price: 70.0, img: three },
  { id: 8, name: "Long Waves", price: 120.0, img: four },
];

const WigRental = () => {
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Filtered by search text
  const filteredWigs = rentalWigs.filter((wig) =>
    wig.name.toLowerCase().includes(searchText.trim().toLowerCase())
  );

  // Sorted by price if applicable
  const sortedWigs = [...filteredWigs].sort((a, b) => {
    if (sortOption === "price-low") return a.price - b.price;
    if (sortOption === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto py-12">
      {/* Page Title */}
      <div className="text-center mb-10 py-5 text-white bg-black">
        <h1 className="text-3xl md:text-4xl font-bold">Wig Rentals</h1>
        <p className=" mt-2">Affordable, stylish, and available short-term!</p>
      </div>

      {/* Filter + Sort */}
      <div className="mb-8 flex flex-wrap justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by style or length"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedWigs.length > 0 ? (
          sortedWigs.map((wig) => (
            <ProductCard key={wig.id} product={wig} rental />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No wigs found.</p>
        )}
      </div>
    </div>
  );
};

export default WigRental;
