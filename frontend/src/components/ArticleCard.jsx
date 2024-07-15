import React from "react";

export default function ArticleCard({
  urlToImage="",
  author,
  title,
  description,
  publishedAt,
  url,
}) {
  return (
    <div className="max-w-sm md:min-h-[500px] bg-white border border-blue-200 rounded-lg shadow dark:bg-gray-800 dark:border-blue-700 px-4 p-2 flex flex-col justify-between ">
      <div>
      <div className="min-h-1/4 flex flex-col justify-between ">
        <h5 className="mb-4 text-lg md:text-xl font-bold tracking-tight text-gray-900 dark:text-white h-1/2 ">
          {title.length > 70 ? title.substring(0, 60) + "..." : title}
        </h5>
        <div className=" flex justify-between h-1/2  ">
          {author && (
            <p className="mb-3 text-xs md:text-sm  font-semibold text-gray-700 dark:text-gray-400 w-4/5">
              {author.split(",")[0]}
            </p>
          )}
          <span className="mb-3 text-xs md:text-sm font-normal text-gray-700 dark:text-gray-400 w-full text-end ">
            {new Date(publishedAt).toDateString()}
          </span>
        </div>
      </div>
      <div className=" h-1/2">
        <img className="rounded-lg mb-3 w-full max-h-[200px]" src={urlToImage.includes("jpg")? urlToImage:"/Images/no-picture-available-icon-1.jpg"} alt="" />
        <div className=" flex flex-col">
          <p className="mb-3 text-sm md:text-base font-medium md:font-normal text-gray-700 dark:text-gray-400  ">
            {description?.length > 100
              ? description.substring(0, 140) + "..."
              : description}
          </p>
        </div>
      </div>
      </div>

      <div className="self-end mb-2 ">
        <a
          href={url}
          target="_blank"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
