import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      {/* <footer className="footer mt-auto  p-1 bg-black text-white ">
        <aside className="sm:mx-52">
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
          <p>
            This website does not retain any files on its server. Rather, it
            solely provides links to
            <br />
            media content hosted by third-party services.This website is only a
            user interface presenting links to third-party providers
          </p>
        </aside>

        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
        </nav>
      </footer> */}
      <footer className="footer footer-center mt-auto  p-10 bg-black text-white ">
        <aside>
          <p>
            This website does not retain any files on its server. Rather, it
            solely provides links to
            <br />
            media content hosted by third-party services.This website is only a
            user interface presenting links to third-party providers on the
            internet
          </p>
          <p>© 2024 - All Rights Reserved anibase.xyz</p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
