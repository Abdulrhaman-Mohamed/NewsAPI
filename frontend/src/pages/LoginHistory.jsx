import React, { useEffect } from "react";
import useRequest from "../hooks/useRequest";

export default function LoginHistory() {
  const {data_ , loading_ , error , requestApi}=  useRequest();

  useEffect(()=>{
    const fetchLoginHistory = async()=>{
      await requestApi('/auth/login-history');
    }
    fetchLoginHistory();
  },[])


  return (
    <div className="pt-20">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Time of login & IP
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data_?.data?.map((item)=>(
                <tr key={item._id} className="border-b border-gray-200 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                >
                  <span className=" block">
                  {new Date(item.createdAt).toUTCString()}
                  </span>
                  <span className=" text-gray-500">
                    {item.ipAddress}
                  </span>
                </th>
                <td className="px-6 py-4">
                  {
                    (item.status)?
                    <span className="px-2 py-1 text-xs font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-700">
                      ✔
                    </span>
                    :
                    <span className="px-2 py-1 text-xs font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                      ❌
                    </span>
                  }
                </td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
