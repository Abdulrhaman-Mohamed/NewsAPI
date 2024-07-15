import { apiInstance } from ".";

export const getArticles = async () => (await apiInstance.get("/articles")).data;