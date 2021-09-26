const dotenv = require("dotenv");


dotenv.config();


module.exports = {
    PORT: process.env.PORT,
    API_URL: process.env.MONGO_URL,
    JWT_CLAVE: process.env.JWT_CLAVE,
    HOST: process.env.HOST,
    //esto es para el paginate
    LIMIT: 10,
    PAGE: 1
}