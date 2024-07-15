import React, { useState } from 'react'
import SourceCard from './SourceCard'

export default function SourcesContainer({sources=[] , subscriptions=[]}) {
    const [reRender, setReRender] = useState(false);
    return (
        <div className="flex justify-center items-center flex-wrap gap-4">
            {
                sources.map((source , index)=> <SourceCard key={index} source={source} subscriptions={subscriptions} setReRender={setReRender}  />)
            }
        </div>
        )
}
