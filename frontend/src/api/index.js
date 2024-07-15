import axios from "axios";


export const refreshToken = async () => {
    try {
        const res = (await apiInstance.get("/auth/refresh-token")).data;
        return res;
    } catch (error) {
        console.log(error);
    }

}

export const apiInstance = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    
});

apiInstance.interceptors.response.use((res)=>{
    return res;
},
async function (error) {
    const originalRequest = error.config;
    // console.log("error", originalRequest);
    // console.log("error", error);
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refresh = await refreshToken();
        console.log("refresh", refresh);

        return apiInstance(originalRequest);
    }

    return Promise.reject(error);

});