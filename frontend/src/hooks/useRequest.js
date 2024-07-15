import React, { useState } from 'react'
import { apiInstance } from '../api';


export default function useRequest() {
    const [data_ , setData] = useState();
    const[loading_,setLoading] = useState(false);
    const[error,setError] = useState();

    const requestApi =async(url , options)=>{ 
        setLoading(true);
        try {
            const response = (await apiInstance(url,options)).data
            setData(response);

        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    return {data_ , loading_ , error ,requestApi}
}
