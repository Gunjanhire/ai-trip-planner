import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: About */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">AI Trip Planner</h2>
          <p className="text-gray-300 mt-2 leading-relaxed">
            Your smart travel assistant for seamless and personalized trip planning.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">Quick Links</h2>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">Home</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">About</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">Destinations</a></li>
            <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">Follow Us</h2>
          <div className="flex gap-4 mt-3">
            <a href="#" className="text-gray-300 hover:text-blue-500 text-2xl transition duration-300"><FaFacebookF /></a>
            <a href="#" className="text-gray-300 hover:text-blue-400 text-2xl transition duration-300"><FaTwitter /></a>
            <a href="#" className="text-gray-300 hover:text-pink-500 text-2xl transition duration-300"><FaInstagram /></a>
            <a href="#" className="text-gray-300 hover:text-blue-600 text-2xl transition duration-300"><FaLinkedin /></a>
            <a href="#" className="text-gray-300 hover:text-red-500 text-2xl transition duration-300"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      {/* Copyright & Credit */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
        <p>&copy; 2025 AI Trip Planner. All rights reserved.</p>
        <p className="mt-2 text-gray-300 text-base">
          Developed with <span className="text-red-500 text-lg">❤️</span> by 
          <span className="font-semibold text-blue-400"> [Gunjan Hire]</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
