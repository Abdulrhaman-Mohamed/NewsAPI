// libraries
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');

//Constants
const { PORT, API_URL } = require('./config/constant');

//Config
const dbConnection = require('./config/database');
const {  conncetRedis } = require('./config/redis');
const logger = require('./config/logger');
const { getTop5_articles, getTop5_sources } = require('./config/scheduling');
const { cacheAllSources } = require('./config/cachSources');

//Middleware
const errorHandler = require('./middleware/errorHandler');

//Routes
const authRouter = require('./routes/auth');
const articlesRouter = require('./routes/articles');
const sourcesRouter = require('./routes/sources');


const app = express();


app.use(cors(
    {
        origin: 'http://localhost:3000', 
        credentials: true,  
    }
));

app.use(cookieParser());

app.use(express.json());


app.use((req, res, next) => {
    logger.info(`'${req.method}' ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World');
    res.json({ message: 'Hello World' });
    return;
});

app.use(`${API_URL}/auth`, authRouter);
app.use(`${API_URL}/articles`, articlesRouter);  
app.use(`${API_URL}/sources`, sourcesRouter); 

app.use(errorHandler);


app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

dbConnection();

conncetRedis();

setInterval(getTop5_articles, 3 * 60 * 1000); // for Each 3 min get top 5 sources's articles

setInterval(getTop5_sources, 3* 60 * 1000); // for Each 3 min get top 5 sources

setTimeout(()=>console.log("Caching Now...."),3* 60 * 1000)

getTop5_articles(); // get top 5 sources's articles  for call in first time

getTop5_sources(); // get top 5 sources for call in first time

//  cache all sources in load the application
cacheAllSources(); 
 

