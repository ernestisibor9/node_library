import React, { useState } from "react";
import student from "../images/student.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loaderObj = useSelector((store) => store.loaderSlice.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputVal = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.email === "" || user.password === "") {
      toast.error("Fields cannot be empty!");
    } else {
      dispatch(showLoading());
      const response = await axios.post("/api/users/login", user);
      try {
        if (response.data.success) {
          dispatch(hideLoading());
          localStorage.setItem("library", response.data.data);
          toast.success(response.data.msg);
          navigate("/");
        } else {
          dispatch(hideLoading());
          toast.error(response.data.msg);
        }
      } catch (err) {
        dispatch(hideLoading());
        toast.error(err.message);
      }
    }
  };
  return (
    <div className="grid grid-cols-2 bg-blue-600 h-screen w-screen gap-4">
      {loaderObj && <Spinner />}
      <div className=" h-screen img-front">
        <img src={student} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex justify-center items-center signup">
        <div className="w-[550px]">
          <div className="card shadow p-3">
            <div className="card-body">
              <h3 className="text-center fw-bold">Login</h3>
              <form onSubmit={handleSubmit}>
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
                    Login
                  </button>
                </div>
              </form>
              <div className="flex justify-center mb-1 mt-3">
                <span>
                  Don't have an account?
                  <Link
                    to="/register"
                    className="text-red-600 font-semibold no-underline ml-1 cursor-pointer"
                  >
                    SignUp
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

export default Login;
