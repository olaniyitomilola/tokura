// Footer.jsx
import React, { useState } from "react";
import { Mail, Instagram, Music2 } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setNotification("");

    const baseUrl = import.meta.env.VITE_API_URL;

    try {
      const res = await fetch(`${baseUrl}/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstName }),
      });

      if (res.status === 409) {
        setNotification("You are already a subscriber");
      } else if (!res.ok) {
        throw new Error("Something went wrong");
      } else {
        setNotification("Subscribed successfully!");
        setEmail("");
        setFirstName("");
      }
    } catch (err) {
      setNotification(err.message || "Subscription failed");
    }
  };

  return (
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
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleSubscribe}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="px-4 py-2 rounded-md text-white w-full sm:flex-1 border"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md text-white w-full sm:flex-1 border"
              required
            />
            <button
              type="submit"
              className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200"
            >
              Subscribe
            </button>
          </form>
          {notification && (
            <p className="mt-2 text-sm text-yellow-300">{notification}</p>
          )}
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
  );
};

export default Footer;
