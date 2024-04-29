import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaAlignJustify, FaWindowClose } from "react-icons/fa";
const NavBar = () => {
  return (
    <div className="navbar lg:sticky lg:backdrop-filter  lg:bg-opacity-30 lg:backdrop-blur-lg  lg:bg-base-300 lg:top-0 lg:z-10 ">
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
            <a>This Season</a>
          </li>
          <li>
            <a>Browse Anime</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default NavBar;
