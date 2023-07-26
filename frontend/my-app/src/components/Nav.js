import React, { useState } from "react";
import { AiFillAppstore, AiFillCloseSquare } from "react-icons/ai";
import { RxTextAlignJustify } from "react-icons/rx";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  let Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Contact", link: "/contact" },
    { name: "Blog", link: "/blog" },
  ];
  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 px-7 md:px-10">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins]">
          <span>
            <AiFillAppstore color="indigo" size={28} className="mr-2" />
          </span>
          <span className="text-3xl">Designer</span>
        </div>
        {/* Menu Icon*/}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {isOpen ? <AiFillCloseSquare /> : <RxTextAlignJustify />}
        </div>
        {/* Menu */}
        <ul
          className={`font-semibold md:flex md:items-center md:pb-0 pb-10 absolute md:static
        bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all
        duration-500 ease-in ${isOpen ? "top-20" : "top-[-490px]"}`}
        >
          {Links.map((item) => {
            return (
              <li
                key={item.name}
                style={{ listStyleType: "none" }}
                className="md:ml-8 text-xl md:my-0 my-8"
              >
                <a
                  href={item.link}
                  style={{ textDecoration: "none" }}
                  className="text-blue-600 hover:text-red-600 duration-500"
                >
                  {item.name}
                </a>
              </li>
            );
          })}
          <button
            className="bg-indigo-700 text-white rounded py-2 px-6 rounded hover:bg-indigo-500 cursor-pointer
    md:ml-8 duration-500 border-none"
          >
            Get Started
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
