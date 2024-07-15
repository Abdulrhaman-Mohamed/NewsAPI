import React, { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";

export default function SourceCard({source , subscriptions=[]}) {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const {
        name,
        description,
        url,
        category,
        language,
        country,
        id,
      } = source;

    const {data_,loading_,error,requestApi} = useRequest();

    const subscribeHandler = async (id) => {
        await requestApi(`/sources/subcribe-source`, {
          method: "POST",
          data:{
            source:id
          }
        });
      };
    
    useEffect(() => {
        if(subscriptions.includes(id)) setIsSubscribed(true);
        if(data_?.status === "success") setIsSubscribed(true);
    }, [subscribeHandler]);




  return (
    <div className="flex flex-col md:h-[250px]   bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 overflow-hidden">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg  "
        src="/Images/website_image.jfif"
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <div className=" flex mb-2">
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400">
            {category}
          </span>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400">
            {country}
          </span>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400">
            {language}
          </span>
        </div>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description.length > 100
            ? description.substring(0, 60) + "..."
            : description}
        </p>
        <div className=" flex items-center gap-2">
          <a
            target="_blank"
            href={url}
            className=" flex gap-1 border-blue-500 text-blue-500 border-2 py-2 px-4 hover:bg-blue-500 hover:text-white rounded-lg group transition-all"
          >
            <svg
              className="w-6 h-6 text-blue-500 dark:text-white group-hover:text-white "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
              />
            </svg>
            Visit Website
          </a>
          {
            !isSubscribed && <button onClick={()=>subscribeHandler(id)} className="flex gap-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-500 border-blue-500 border-2 group">
            <svg
              className="w-6 h-6 text-white-800 dark:text-white group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                clipRule="evenodd"
              />
            </svg>
            Subscribe
          </button>
          }
          
        </div>
      </div>
    </div>
  );
}
