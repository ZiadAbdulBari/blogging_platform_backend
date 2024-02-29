import jwt from 'jsonwebtoken';
const tokenCheck = (req,res,next)=>{
    const {authorization} = req.headers;
    // console.log(authorization);
    try{
        const token = authorization;
        const decode = jwt.verify(token,process.env.JWT_TOKEN);
        const {id,email} = decode;
        req.id = id;
        req.email = email;
        next();
    }
    catch{
        res.status(401).json({
            "mgs":"Authentication Failed"
        })
        next("Authentication Failed");
    }
}

module.exports = tokenCheck;