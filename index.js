const express = require ('express');
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8080;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const dbConnect = require('./config/dbConnect');
dbConnect();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.use(cookieParser());

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    const dotenv = require('dotenv').config()
})