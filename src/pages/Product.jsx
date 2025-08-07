import React from "react";

const photographyPlans = [
  {
    name: "Individual Portrait",
    price: "£250/hour",
    image: "https://res.cloudinary.com/olaniyitomilola/image/upload/v1750671056/olan/1b7f8d04-72d3-461a-a5c5-e870cd561b03_2_nh3sls.jpg",
    features: [
      "Up to 2 outfits",
      "8 edited high-resolution images",
      "All unedited photos",
      "7 days delivery period",
      "Extra retouch at £30 per image",
      "Short reels (Additional £100)",
      "Travel fees may apply",
    ],
  },
  {
    name: "Out of Studio / Home session",
    price: "£300",
    image: "https://res.cloudinary.com/olaniyitomilola/image/upload/v1750673535/olan/gfggb_ryvoqv.jpg",
    features: [
      "1:30 hour session at a location of your choice",
      "5 edited high-resolution images",
      "Travel fees may apply",
    ],
  },
  {
    name: "Family/Group Session",
    price: "£300",
    image: "https://res.cloudinary.com/olaniyitomilola/image/upload/v1751180421/olan/OIP_0956_copy_avlyxi.jpg",
    features: [
      "Includes 1.5 hour session",
      "Studio or Outdoor setting",
      "10 edited high-resolution images",
      "5 days delivery period",
      "Travel fees may apply",
    ],
  },
  {
    name: "Small Event Coverage",
    price: "£150/hour",
    image: "https://res.cloudinary.com/olaniyitomilola/image/upload/v1750671021/olan/OIP_3936-2_cpobpj.jpg",
    features: [
      "Transportation/Logistics to the location will be charged separately",
      "Covers event coverage only (portrait session not included)",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold mb-2">Tailored Packages</h2>
        <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
          We have a package that suits your needs, whether it's a solo portrait, family session, or small event coverage. Each package is designed to provide you with high-quality images and a memorable experience.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {photographyPlans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-lg shadow-lg bg-white border border-gray-300 overflow-hidden flex flex-col"
          >
            {/* Image on top */}
            <div
              className="h-40 w-full relative bg-center bg-cover transition-transform duration-300 hover:scale-105"
              style={{ backgroundImage: `url("${plan.image}")` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold px-2 text-center">
                  {plan.name}
                </h3>
              </div>
            </div>


            {/* Pricing and features */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-3xl font-bold text-gray-900 mb-4">{plan.price}</div>
              <ul className="space-y-2 text-gray-700 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
