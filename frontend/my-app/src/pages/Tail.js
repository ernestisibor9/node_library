import React, { useState } from "react";
import { AiFillAppstore, AiFillCloseSquare } from "react-icons/ai";
import { RxTextAlignJustify } from "react-icons/rx";

function Tail() {
  const [isOpen, setIsOpen] = useState(false);
  let Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Contact", link: "/contact" },
    { name: "Blog", link: "/blog" },
  ];
  return (
    <div>
      <div className="shadow-md w-full fixed top-0 left-0">
        <div className="md:px-10 py-4 md:flex justify-between items-center bg-white">
          <div className="flex items-center cursor-pointer gap-1">
            <AiFillAppstore size={28} className="text-indigo-500" />
            <h2 className="text-red-600">Header</h2>
          </div>
          {/* Menus Icons */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className=" absolute right-8 top-6 cursor-pointer md:hidden"
          >
            {isOpen ? (
              <AiFillCloseSquare size={25} />
            ) : (
              <RxTextAlignJustify size={25} />
            )}
          </div>
          {/* Menus  */}
          <ul
            className={`md:flex pl-9 md: ml-0 md:items-center md:pb-0 pb-10 absolute
          md:z-auto z-[-1] left-0 w-full transition-all duration-500 bg-white ease-in ${
            isOpen ? "top-12" : "top-[-490px]"
          }`}
          >
            {Links.map((item) => {
              return (
                <li
                  style={{ listStyleType: "none" }}
                  className="font-semibold my-7 md:my-0 md:ml-8"
                >
                  <a href="/" style={{ textDecoration: "none" }}>
                    {item.name}
                  </a>
                </li>
              );
            })}
            <button
              className=" bg-blue-600 text-white py-2 px-3 rounded border-none hover:bg-red-600
            md:ml-8"
            >
              Get Started
            </button>
          </ul>
        </div>
      </div>
      <div className="bg-indigo-600 w-full h-screen"></div>
    </div>
  );
}

export default Tail;
