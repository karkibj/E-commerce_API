const jwt=require('jsonwebtoken');
const User=require('../models/user');

const  jwtAuth=async (req,res,next)=>{
  
    const token = req.cookies.accessToken;
   
if (!token)
     return res.status(401).json({ error: 'Access denied' });
try {
 const decoded = jwt.verify(token, process.env.SECRET);
//  console.log(decoded.userId);
 const user= await User.findById(decoded.userId);
console.log(user);
//  console.log(user)
 if(!user){
    return res.status(404).json({error:"Unauthorized"})
 }
req.user=user;
 return next();

 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
}
}



module.exports={
    jwtAuth,

}