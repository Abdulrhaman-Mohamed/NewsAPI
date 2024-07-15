import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar';
import { initFlowbite } from 'flowbite';

export default function Main() {
    const {isAuth} = useAuth();
    useEffect(() => {
      initFlowbite();
    }, []);
  return (
    <>
    {
        (isAuth())? 
        <>
        <Navbar />
        <Outlet />
        <ToastContainer />
        </>
        :
        <Navigate to='/login' />
    }
    </>
  )
}
