const { connectDb } = require('./connection');
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const router = require('./routes/route');
const userRouter=require("./routes/user.routes")
const { startSession } = require('./models/products');
require('dotenv').config()

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
// const url = 'mongodb+srv://karkibj341:7P2ngkPMYigYj9NW@binayakarki.gq7swh7.mongodb.net//Ecommerce?retryWrites=true&w=majority';
const url="mongodb+srv://karkibj341:7P2ngkPMYigYj9NW@binayakarki.gq7swh7.mongodb.net//Ecommerce?retryWrites=true&w=majority&appName=BinayaKarki"
const port = 8080;
// connectDb("mongodb+srv://karkibj341:7P2ngkPMYigYj9NW@binayakarki.gq7swh7.mongodb.net/Ecommerce");
connectDb(url);


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
