"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-700 mb-6 max-w-md">
        Sorry, the page you are looking for does not exist. It might have been
        moved or deleted.
      </p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
