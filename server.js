const { connectDb } = require('./connection');
const express = require('express');
const path=require('path')
const router = require('./routes/route');
const { startSession } = require('./models/products');
app = express();
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));
port = 8080;
connectDb("mongodb+srv://karkibj341:7P2ngkPMYigYj9NW@binayakarki.gq7swh7.mongodb.net/Ecommerce");


app.use('/home', router)


app.listen(port, () => {
    console.log(`Server running at ${port}`);
})