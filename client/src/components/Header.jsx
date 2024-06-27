import React from "react";

import { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import logo from "../assets/images/logo.png"
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {

    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);

  };

  useEffect(() => {

    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-cyan-700 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
        <Link to="/">
        <div className="flex flex-row gap-2">
          <img src={logo} alt="logo" className="w-10 h-10"/>
          <h1 className="font-bold text-sm sm:text-3xl flex flex-wrap">
            <span className="text-white">Home</span>
            <span className="text-white">Quest</span>
          </h1>
          </div>
        </Link>

        <form onSubmit={handleSubmit}  className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
            <button>
          <FaSearch className="text-slate-600" />

          </button>
        </form>
        <ul className="flex gap-4 justify-between items-center">
          <Link to="/">
            <li className="hidden sm:inline text-white hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-white hover:underline">
              About
            </li>
          </Link>
          <Link to="profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                className="h-8 w-8 rounded-full border-2 border-white"
              />
            ) : (
              <li className="text-white hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
// learn more about tailwind
