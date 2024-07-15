import { apiInstance } from ".";

export const loginApi = async (body) => {
    const res = (await apiInstance.post("/auth/login",body)).data;
    return res;
};



export const registerApi = async (body) => {
    const res = (await apiInstance.post("/auth/register", body)).data;
    return res;
}

export const logoutApi = async () => (await apiInstance.post("/auth/logout")).data;

