const { connectDb } = require('./connection');
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const router = require('./routes/route');
const userRouter=require("./routes/user.routes")
const { startSession } = require('./models/products');
var cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
const port = 8080;
connectDb();


const options = {
    definition: {
        info: {
            title: 'E-commerce Application',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:8080/'
            }
        ]
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/home', router);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
