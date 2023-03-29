const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        const verify = jwt.verify(token,"this is dummy token");
        next();
    }catch{
        return res.status(401).json({message:'You are not authorize user.'})
    }
}