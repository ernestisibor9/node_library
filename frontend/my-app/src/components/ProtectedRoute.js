import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      const response = await axios.post(
        "/api/users/get-user-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("library")}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.data);
        // Message
        dispatch(setUser(response.data.data));
      } else {
        localStorage.removeItem("library");
        navigate("/login");
      }
    } catch (err) {
      localStorage.removeItem("library");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("library")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{children}</div>;
}

export default ProtectedRoute;
