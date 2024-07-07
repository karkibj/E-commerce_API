const { Schema, model } = require('mongoose');

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
    }
});

const User = model("User", UserSchema); 
module.exports = User;
