const express=require('express');
const User=require('../models/user');
const {createUser}=require('../controllers/user')
const router=express.Router();
