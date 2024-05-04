import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { FaAlignJustify, FaWindowClose, FaSearch } from "react-icons/fa";
import NavSearchBar from "./NavSearchBar";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleThisSeasonClick = () => {
    navigate("/search/ANIME?season=SPRING&year=2024");

    const currentPath = location.pathname;
    if (currentPath.includes("/search/ANIME")) {
      // Refresh the page by navigating to the same route
      window.location.reload();
    } else {
      // Navigate normally without a refresh
      navigate("/search/ANIME?season=SPRING&year=2024");
    }
  };

  return (
    <div className="navbar lg:sticky lg:backdrop-filter  lg:bg-opacity-30 lg:backdrop-blur-lg text-white lg:bg-base-300 lg:top-0 lg:z-10 ">
      <div className="navbar-start">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
            <FaAlignJustify />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52 "
          >
            <li>
              <a>This Season</a>
            </li>
            <li>
              <a>Browse Anime</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <img src="/favicon.ico" className="bg-transparent size-12" />
          <Link to="/">
            <h1
              className="font-bold text-2xl cursor-pointer
    text-red-800 font-body uppercase"
            >
              Anibase
            </h1>
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a onClick={handleThisSeasonClick}>This Season</a>
          </li>
          <li>
            <a>Browse Anime</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <NavSearchBar />
      </div>
    </div>
  );
};
export default NavBar;
