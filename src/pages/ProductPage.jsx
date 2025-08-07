import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loader from "../component/Loader";
import { useCart } from "../Context/CartContext";
import { useCurrency } from "../Context/CurrencyContext";


const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart, openCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeImage, setActiveImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedLength, setSelectedLength] = useState(null);

  const [showSpecs, setShowSpecs] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const incrementQty = () => setQuantity((q) => q + 1);
  const decrementQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));


  const handleAddToCart = () => {
    if (!selectedLength) return;

    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.img,
      price: selectedLength.price,
      size: selectedLength.size,
      quantity, // ← use selected quantity
      currency,
    };

    const added = addToCart(cartItem);
    if (added !== false) {
      openCart();
      setQuantity(1); // Reset quantity after adding
    }
  };



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${baseUrl}/products/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);

        const imagesArray = data.otherImages?.length
          ? [data.img, ...data.otherImages.map(imgObj => imgObj.image)]
          : [data.img];
        setActiveImage(imagesArray[0]);
        setImageIndex(0);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // After product and component render, trigger Pinterest parsing
  useEffect(() => {
    if (product?.widget_link && window?.PinUtils?.build) {
      window.PinUtils.build();
    }
  }, [product]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="text-center mt-20">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 underline"
        >
          Go back
        </button>
      </div>
    );

  if (!product)
    return (
      <div className="text-center mt-20">
        <p className="text-gray-500 mb-4">Product not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 underline"
        >
          Go back
        </button>
      </div>
    );

  const allImages = product.otherImages?.length
    ? [product.img, ...product.otherImages.map((imgObj) => imgObj.image)]
    : [product.img];

  const nextImage = () => {
    const nextIndex = (imageIndex + 1) % allImages.length;
    setImageIndex(nextIndex);
    setActiveImage(allImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (imageIndex - 1 + allImages.length) % allImages.length;
    setImageIndex(prevIndex);
    setActiveImage(allImages[prevIndex]);
  };

  const handleSelectLength = (length) => {
    if (length.price !== null && length.stock > 0) {
      setSelectedLength(length);
    }
  };

  const { convertPrice, currency } = useCurrency();

  const getCurrencySymbol = (curr) => {
    switch (curr) {
      case "USD":
        return "$";
      case "GBP":
        return "£";
      case "CAD":
        return "CA$";
      default:
        return "$";
    }
  };

  const displayPrice = selectedLength?.price
    ? `${getCurrencySymbol(currency)}${convertPrice(selectedLength.price).toFixed(2)}`
    : "Select a length";


  const hasSpecifications = product?.specifications && Object.keys(product.specifications).length > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 ">
      {/* Back button outside the grid */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-700 hover:text-gray-900"
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Back
      </button>


      <div className="grid md:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div className="flex flex-col md:flex-row gap-4">
          {product.otherImages && (
            <div className="hidden md:flex flex-col space-y-2 overflow-y-auto">
              {allImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => {
                    setActiveImage(img);
                    setImageIndex(i);
                  }}
                  className={`w-16 h-16 object-cover rounded-md cursor-pointer border ${img === activeImage ? "border-black" : "border-transparent"
                    }`}
                />
              ))}
            </div>
          )}

          {/* Main Image */}
          <div className="relative w-full">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-[500px] object-contain rounded-lg shadow"
            />

            {product.otherImages && (
              <div className="flex justify-between md:hidden absolute inset-0 items-center px-2">
                <button
                  onClick={prevImage}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-6 text-justify">
            {product.description || "No description available."}
          </p>


          {/* Quick Details Button */}
          {hasSpecifications && (
            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className="mb-4 px-4 py-2 rounded-md border border-gray-700 text-gray-700 hover:bg-gray-100 transition"
            >
              {showSpecs ? "Hide Quick Details" : "Show Quick Details"}
            </button>
          )}

          {/* Specifications Display */}
          {showSpecs && (
            <div className="mb-6 border p-4 rounded-md bg-gray-50 text-sm text-gray-700">
              <h3 className="font-semibold mb-2">Specifications</h3>
              <ul className="list-disc list-inside space-y-1 text-justify">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xl text-gray-700 mb-4">{displayPrice}</p>

          {/* Length/Size Options */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Select Length</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {product.lengths.map((length) => {
                const isAvailable = length.price !== null && length.stock > 0;
                const isSelected = selectedLength?.size === length.size;

                return (
                  <button
                    key={length.size}
                    onClick={() => handleSelectLength(length)}
                    disabled={!isAvailable}
                    className={`px-18 py-2 rounded-md border text-sm transition
                    ${isAvailable
                        ? "cursor-pointer"
                        : "bg-gray-200 text-gray-400"
                      }
                    ${isSelected ? "bg-black text-white" : ""}`}
                  >
                    {length.size}"
                  </button>
                );
              })}
            </div>
          </div>
          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6 justify-center">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded">
              <button
                onClick={decrementQty}
                className="px-3 py-1 text-lg border-r hover:bg-gray-100"
              >
                −
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={incrementQty}
                className="px-3 py-1 text-lg border-l hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>


          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-15 py-3 rounded-md hover:bg-gray-800 transition disabled:opacity-50 cursor-pointer"
            disabled={!selectedLength}
          >
            Add to Cart
          </button>

          {/* Pinterest Board Widget */}
          {product.widget_link && (
            <div className="mb-6 py-6">
              <h3 className="font-semibold mb-2">Styling Inspiration</h3>
              <a
                data-pin-do="embedBoard"
                data-pin-board-width="400"
                data-pin-scale-height="240"
                data-pin-scale-width="80"
                href={product.widget_link}
              ></a>
            </div>
          )}

        </div>

      </div>



    </div>
  );
};

export default ProductPage;
