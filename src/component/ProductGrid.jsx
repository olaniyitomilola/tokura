import React from "react";
import ProductCard from "./ProductCard"; // make sure path is correct

const ProductGrid = ({ title, products, removeSpace }) => {
  return (
    <div className= {removeSpace? "px-4 max-w-7xl mx-auto" : "px-4 py-12 max-w-7xl mx-auto space-y-8"}>
      {title && (
        <h3 className="text-2xl font-semibold mb-8 text-center">{title}</h3>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
