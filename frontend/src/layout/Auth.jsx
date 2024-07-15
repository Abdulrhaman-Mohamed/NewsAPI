import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hooks/useAuth";

export default function Auth() {
  const { isAuth } = useAuth();
  return (
    <>
      {!isAuth() ? (
        <div className="h-screen flex items-center justify-center">
          <Outlet />
          <ToastContainer />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
