const apiInstance = require(".");
const logger = require("../config/logger");

const getSources =  async() => {
    try {
        logger.warn("Fetching sources from NewsApi...");
        const response = (await apiInstance.get("/top-headlines/sources")).data;
        return response;
    } catch (error) {
        logger.error("Error in fetching sources from NewsApi");
    }
}

const getSourceById = async (soucres_id="") => {
    try {
        if(soucres_id && soucres_id.length > 0){
            logger.warn(`Fetching source by id ${soucres_id} from NewsApi...`);
            const response = (await apiInstance.get(`/top-headlines?sources=${soucres_id? soucres_id:" "}`)).data;
            return response;
        }
        else
        return ""

    } catch (error) {
        console.log(error);
        logger.error("Error in fetching source by id from NewsApi");
    }
}

module.exports = {
    getSources,
    getSourceById
}