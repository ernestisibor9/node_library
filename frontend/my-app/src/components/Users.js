import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import Notiflix from "notiflix";
import moment from "moment";

function Users({ role }) {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`/api/users/get-all-users/${role}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("library")}`,
        },
      });
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  console.log(users);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <div className="card shadow mt-3">
        <div className="card-body">
          <table class="table table-responsive ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                {/* <th scope="col">Phone</th> */}
                <th scope="col">Created At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    {/* <td>{user.phone}</td> */}
                    <td>{moment(user.createdAt).format("DD-MM-YYYY")}</td>
                    <td className="">
                      <FaEdit
                        size={24}
                        className="cursor-pointer text-blue-600"
                      />
                    </td>
                    <td>
                      <FaTrashAlt
                        size={24}
                        className="cursor-pointer text-red-600"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
