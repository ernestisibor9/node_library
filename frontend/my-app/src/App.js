import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import Profile from "./pages/Profile";
import EditBook from "./pages/EditBook";
import Tail from "./pages/Tail";
import Tail2 from "./pages/Tail2";

function App() {
  const loaderObj = useSelector((store) => store.loaderSlice.loading);
  return (
    <div>
      {loaderObj && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-book/:id"
            element={
              <ProtectedRoute>
                <EditBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/tail"
            element={
              <PublicRoute>
                <Tail />
              </PublicRoute>
            }
          />
          <Route
            path="/tail2"
            element={
              <PublicRoute>
                <Tail2 />
              </PublicRoute>
            }
          />
        </Routes>
        <ToastContainer theme="colored" />
      </BrowserRouter>
    </div>
  );
}

export default App;
