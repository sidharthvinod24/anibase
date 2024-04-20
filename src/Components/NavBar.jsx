import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaAlignJustify, FaWindowClose } from "react-icons/fa";
const NavBar = () => {
  let Navigation = [
    { name: "This Season", link: "/" },
    { name: "Browse Anime", link: "/" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-50">
      <div className="lg:flex items-center justify-between bg-transparent pb-0  lg:py-4 lg:px-10 px-7">
        <div className="flex items-center">
          <img src="/favicon.ico" className="bg-transparent size-12" />
          <Link to="/">
            <h1
              className="font-bold text-2xl cursor-pointer
    text-red-800 font-body"
            >
              Akuma
            </h1>
          </Link>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-1 cursor-pointer lg:hidden"
        >
          {open ? <FaWindowClose /> : <FaAlignJustify />}
          {/* <ion-icon name={open ? "close" : "menu"}></ion-icon> */}
        </div>

        <ul
          className={`lg:flex lg:items-center lg:pb-0 text-right  -ml-[55px]  absolute lg:static bg-transparent lg:z-auto z-[-1] w-full lg:w-auto lg:pl-0  transition-all duration-500 ease-in ${
            open ? "top-6 " : "hidden"
          }`}
        >
          {Navigation.map((link) => (
            <li key={link.name} className="lg:ml-8 lg:text-lg lg:my-0 my-5">
              <a
                href={link.link}
                className="text-white mr-1 hover:text-gray-400 duration-500"
              >
                {link.name}
              </a>
            </li>
          ))}
          {/* <Button>Get Started</Button> */}
        </ul>
      </div>
    </div>
  );
};
export default NavBar;
