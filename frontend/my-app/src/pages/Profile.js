import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import TabPane from "antd/es/tabs/TabPane";
import { Tabs } from "antd";
import Books from "../components/Books";
import Users from "../components/Users";
import BookTable from "../components/BookTable";

function Profile() {
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
        <Tabs defaultActivityKey="1">
          <TabPane tab="Books" key="1">
            <Books />
            <BookTable />
          </TabPane>
          <TabPane tab="Patron" key="2">
            <Users role="patron" />
          </TabPane>
          <TabPane tab="Librarian" key="3">
            <Users role="librarian" />
          </TabPane>
          <TabPane tab="Admin" key="4">
            <Users role="admin" />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
