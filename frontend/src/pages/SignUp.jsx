import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { registerApi } from "../api/Auth";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
        const res = await registerApi(data);
        if (res.status === "success") navigate("/login");
    } catch (error) {
      if(error.response){
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      toast.error("Error connection", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
        setLoading(false);  
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign up to <span className=" text-blue-700">News.com</span>
        </h5>
        <div>
          <label
            htmlFor="FullName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            FullName
          </label>
          <input
            type="text"
            name="FullName"
            id="FullName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Abdulrhaman Mohamed"
            {...register("FullName", { required: true })}
          />
          {errors.FullName && (
            <span className=" text-red-600 text-sm">
              This field is required
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="Email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="Email"
            name="Email"
            id="Email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            {...register("Email", {
              required: true,
              pattern:
                /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z_\-\.]{2,5})\.([a-zA-Z]{2,5})$/,
            })}
          />
          {errors.Email && errors.Email.type == "required" && (
            <span className=" text-red-600 text-sm">
              This field is required{" "}
            </span>
          )}
          {errors.Email && errors.Email.type == "pattern" && (
            <span className=" text-red-600 text-sm">Should be valid Email</span>
          )}
        </div>
        <div>
          <label
            htmlFor="Password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="Password"
            name="Password"
            id="Password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            {...register("Password", {
              required: true,
              pattern:
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            })}
          />
          {errors.Password && errors.Password.type == "required" && (
            <span className=" text-red-600 text-sm">
              This field is required{" "}
            </span>
          )}
          {errors.Password && errors.Password.type == "pattern" && (
            <span className=" text-red-600 text-xs">
              Password should be have one uppercase, lowercase , Special
              characters at least and Minimum Length At least 8 characters long{" "}
            </span>
          )}
        </div>

        {loading ? (
          <button
            type="submit"
            disabled
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </button>
        ) : (
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign up
          </button>
        )}

        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          If you have account{" "}
          <Link
            to={"/login"}
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
