import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
    <h1 className="text-6xl font-extrabold mb-4">404</h1>
    <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
    <p className="text-gray-400 mb-6 text-center max-w-md">
      Sorry, the page you are looking for doesn’t exist or has been moved.
    </p>
    <Link
      to="/"
      className="bg-white text-black px-6 py-2 rounded-full shadow hover:bg-gray-200 transition"
    >
      ← Back to Home
    </Link>
  </div>
);

export default NotFound;
