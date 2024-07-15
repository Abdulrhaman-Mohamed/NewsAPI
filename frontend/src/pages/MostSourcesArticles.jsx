import React, { useEffect } from 'react'
import ArticlesContainer from '../components/ArticlesContainer';
import useRequest from '../hooks/useRequest';

export default function MostSourcesArticles() {
    const{data_ , error , requestApi , loading_} = useRequest();

    useEffect(()=>{
      const fetchArticles = async()=>{
        return await requestApi("/sources/top-articles",{
          method:"GET"
        });
      }
      fetchArticles();
    },[])
  return (
    <div className='pt-20 relative'>
    <ArticlesContainer articles={data_?.commonSubscriptions.articles} />
    <button
    onClick={() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className=" fixed bottom-2 right-2 p-4 rounded-full bg-blue-500 text-white"
  >
    <svg
      className="w-6 h-6 text-white dark:text-white"
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
        d="M12 6v13m0-13 4 4m-4-4-4 4"
      />
    </svg>
  </button>
</div>
  )
}
