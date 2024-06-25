const mongoose=require('mongoose');

async function connectDb(url){

     try{
        await mongoose.connect(url);
        console.log("Mongo connected successfully");
    }
    catch(err){
        console.log("Error occured",err);
    }
    
}
module.exports={
    connectDb,
}

