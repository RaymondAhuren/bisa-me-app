
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaUser,
  FaSearch,
  FaMapMarkerAlt,
  FaComments,
  FaServer,
  FaShoppingCart,
  FaHeadphones,
  FaQuestionCircle,
  FaHeart,
} from "react-icons/fa";

function Header() {
   
  return (
    <header className="w-full">
      {/* Notification Bar */}
      <div className="bg-black text-white text-center py-2 text-sm">
        <p>NOTIFICATION BAR</p>
      </div>

      {/* Welcome + Social Links */}
      <div className="bg-blue-900 text-white flex flex-col md:flex-row justify-between items-center px-6 md:px-14 py-2 space-y-2 md:space-y-0">
        <p className="text-sm">Welcome to BisaMe online store.</p>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Follow us:</span>
          <div className="flex space-x-2">
            <FaFacebook className="cursor-pointer hover:text-blue-400" />
            <FaTwitter className="cursor-pointer hover:text-sky-400" />
            <FaInstagram className="cursor-pointer hover:text-pink-500" />
            <FaTiktok className="cursor-pointer hover:text-black" />
          </div>
        </div>
      </div>

      {/* Logo + Search + Sell + User */}
      <div className="bg-blue-900 text-white flex flex-col md:flex-row justify-between items-center px-6 md:px-24 py-3 md:space-y-0 space-y-3 border-t border-white">
        {/* Logo */}
        <Link href="/">
          <h2 className="cursor-pointer text-2xl font-bold">BisaMe</h2>
        </Link>

        {/* Search */}
        <form className="flex flex-col md:flex-row items-center md:space-x-2 w-full md:w-auto space-y-2 md:space-y-0">
          {/* Location Input */}
          <div className="flex items-center border border-gray-300 rounded-lg bg-white px-2 py-1 w-full md:w-auto text-sm">
            <FaMapMarkerAlt className="text-gray-500 mr-1" />
            <input
              type="text"
              placeholder="All Ghana"
              className="w-full text-black text-sm focus:outline-none py-0.5 px-1"
            />
          </div>

          {/* Search Input */}
          <div className="flex items-center border border-gray-300 rounded-lg bg-white px-2 py-1 w-full md:w-auto text-sm">
            <input
              type="search"
              placeholder="I am looking for..."
              className="w-full text-black text-sm focus:outline-none py-0.5 px-1"
            />
            <FaSearch className="text-gray-500 ml-1" />
          </div>
        </form>

        {/* Sell Button + Outline Heart + User */}
        <div className="flex items-center space-x-3">
          <button className="bg-yellow-400 text-white px-4 py-1 rounded-lg font-bold text-sm hover:bg-yellow-500">
            SELL
          </button>
          {/* Outline Heart: transparent fill, black border */}
          <FaHeart className="cursor-pointer hover:text-red-600" />
          <FaUser size={20} className="cursor-pointer text-yellow-400" />
         
        </div>
      </div>

      {/* Services + Contact */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-24 py-3 bg-white text-black text-sm space-y-2 md:space-y-0">
        {/* Services Links */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-8 w-full md:w-auto">
          <p className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <FaServer /> Service
          </p>
          <p className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <FaShoppingCart /> Buy / Sell
          </p>
          <p className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <FaHeadphones /> Customer Support
          </p>
          <p className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
            <FaQuestionCircle /> Need Help
          </p>
        </div>

        {/* Phone + Chat */}
        <div className="flex items-center space-x-4">
          <p className="font-semibold">+233 59467 3304</p>
          <div className="relative">
            <FaComments className="text-2xl cursor-pointer hover:text-blue-600" />
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
              9+
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
