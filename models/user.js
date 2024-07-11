const { Schema, model, default: mongoose } = require('mongoose');
const Product = require('./products');

const UserSchema = new Schema({
    Name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    Phone: {
        type: Number,
        required: [true, "Phone is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    Refreshtoken:{
        type:String
    },
    myCart:[{
        _id:{
           type:mongoose.Schema.ObjectId,
           ref:"product_info",
        },
        quantity:{
            type:Number}
           
        }
        

        
    ]
})


const User = mongoose.model("User", UserSchema); 
module.exports = User;
