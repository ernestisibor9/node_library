import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

function Home() {
  const userObj = useSelector((store) => store.userSlice.user);
  console.log(userObj);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("library");
    navigate("/login");
  };
  return (
    <div className="h-screen w-screen">
      <div className="flex justify-between items-center bg-blue-600 p-3">
        <h1 className="text-white cursor-pointer" onClick={() => navigate("/")}>
          E-LIBRARY
        </h1>
        <div className="flex justify-between items-center w-[180px] pr-2 bg-white rounded p-2">
          <FaUserCircle size={25} />
          <Link to="/profile" className="text-gray-600 fs-5 underline-offset-2">
            {userObj?.name}
          </Link>
          <AiOutlineLogout
            size={25}
            onClick={logout}
            color="red"
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="p-4">
        <h3>Welcome {userObj?.name}</h3>
      </div>
    </div>
  );
}

export default Home;
