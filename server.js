const {connectDb}=require('./connection');
const express=require('express');
const router=require('./routes/route')
app=express();
port=8080;
connectDb("mongodb+srv://karkibj341:7P2ngkPMYigYj9NW@binayakarki.gq7swh7.mongodb.net/Ecommerce");
app.use(express.urlencoded({extended:false}))
app.use('/admin',router)
app.listen(port,()=>{
    console.log(`Server running at ${port}`);
})