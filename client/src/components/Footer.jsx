
import React from 'react';
import { FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-cyan-700 text-white p-4 w-full  mt-auto">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <p className="text-sm">&copy; 2024 HomeQuest. All rights reserved.</p>
        </div>
        <nav className="flex gap-4">
          <FaYoutube className="text-white hover:text-gray-400" size={20} />
          <FaFacebook className="text-white hover:text-gray-400" size={20} />
          <FaInstagram className="text-white hover:text-gray-400" size={20} />
        </nav>
      </div>
    </footer>
  );
};

export default Footer;









