import React from 'react';
import { Outlet } from 'react-router-dom';
import '../App.css'; // Make sure your CSS file is imported
import {
  Mail,
  Instagram,
  Music2
} from "lucide-react";
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

            <footer className="bg-gray-900 text-white mt-12 px-6 py-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* 📩 Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
                        <p className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-300" />
                            support@tokuraluxury.com
                        </p>
                    </div>

                    {/* 📨 Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">Subscribe to Our Newsletter</h4>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 rounded-md text-white w-full sm:flex-1 border"
                            />
                            <button
                                type="submit"
                                className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* 📱 Social Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
                        <p className="flex items-center gap-2">
                            <Instagram className="w-4 h-4 text-pink-400" />
                            <a
                                href="https://instagram.com/tokuraluxury"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                @tokuraluxury
                            </a>
                        </p>
                        <p className="flex items-center gap-2 mt-1">
                            <Music2 className="w-4 h-4 text-white" />
                            <a
                                href="https://tiktok.com/@tokura.luxury"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                @tokura.luxury
                            </a>
                        </p>
                        <p className="mt-2 text-sm text-gray-400">
                            Stay updated on drops and promotions!
                        </p>
                    </div>
                </div>

                {/* 🔻 Footer Bottom */}
                <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Tokura Luxury. All rights reserved.
                </div>
            </footer>
        </div>

    );
};

export default Body;
