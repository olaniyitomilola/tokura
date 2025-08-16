import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import "../App.css";

const announcementText = `
  🎉 Free shipping on orders over CA $150! 
  🎁 New bundles just dropped! 
  👑 Premium wigs now in stock! 
  ✨ Follow us on Instagram @tokuraluxury
`;

const Body = () => {
  return (
    <div className="body-container flex-1 flex flex-col">
      {/* Marquee */}
      <div className="bg-black text-white text-sm font-medium py-2 marquee-wrapper">
        <div className="marquee-inner">
          <span className="mx-4">{announcementText}</span>
          <span className="mx-4">{announcementText}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Body;
