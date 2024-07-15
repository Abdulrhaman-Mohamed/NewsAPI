import React from "react";
import ArticleCard from "./ArticleCard";

export default function ArticlesContainer({articles=[]}) {

  return (
    <div className="flex justify-center items-center flex-wrap gap-4">

      {
        articles.map((article,index)=> <ArticleCard key={index} {...article} />)
      }
    </div>
  );
}
