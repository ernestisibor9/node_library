import React, { useState } from "react";
import student from "../images/student.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputVal = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.name === "" || user.email === "" || user.password === "") {
      toast.error("Fields cannot be empty!");
    } else {
      const response = await axios.post("/api/users/register", user);
      try {
        if (response.data.success) {
          toast.success(response.data.msg);
        } else {
          toast.error(response.data.msg);
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 bg-blue-600 h-screen w-screen gap-4">
      <div className=" h-screen img-front">
        <img src={student} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex justify-center items-center signup">
        <div className="w-[550px]">
          <div className="card shadow p-3">
            <div className="card-body">
              <h3 className="text-center fw-bold">Sign Up</h3>
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    placeholder="Name"
                    value={user.name}
                    onChange={inputVal}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Email address</label>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    placeholder="Email"
                    value={user.email}
                    onChange={inputVal}
                  />
                </div>
                <div class="mb-4">
                  <label class="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    class="form-control"
                    placeholder="Password"
                    value={user.password}
                    onChange={inputVal}
                  />
                </div>
                <div class="d-grid gap-2">
                  <button class="btn btn-primary" type="submit">
                    Register
                  </button>
                </div>
              </form>
              <div className="flex justify-center mb-1 mt-3">
                <span>
                  Already have an account?
                  <Link
                    to="/login"
                    className="text-green-600 font-semibold no-underline ml-1 cursor-pointer"
                  >
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
