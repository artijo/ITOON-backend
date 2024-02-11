const db = require('../lib/prisma');
const jwt = require('jsonwebtoken');

const checkLogin = async (req,res) => {
    const {email,password} = req.body;

    try{
        const user = await db.user.findUnique({
            where : {email}
        });
        if(!user){
            return res.status(400).json({error:"The email is incorrect."});
        }
        if(password != user.password){
            return res.status(400).json({error:"The password is not match"});
        }

        res.json(user)
    }catch(error){
        res.status(500).json(error)
    }
};

const checkLoginWeb = async (req,res,next) => {
    let token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error:"Unauthorized"});
    }
    try{
        const user = jwt.verify(token,process.env.JWT_SECRET);
        const userDetail = await db.user.findUnique({
            where:{email:user.email}
        });
        if(!userDetail){
            return res.status(401).json({error:"Unauthorized"});
        }
        next();
    } catch(error){
        res.status(401).json({error:"Unauthorized"});
    }
}

const isCreator = async (req,res,next) => {
    let token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error:"Unauthorized"});
    }
    try{
        const user = jwt.verify(token,process.env.JWT_SECRET);
        const userDetail = await db.creator.findUnique({
            where:{userId:user.id}
        });
        if(!userDetail){
            return res.status(401).json({error:"Unauthorized"});
        }
        req.creatorId = userDetail.id;
        next();
    } catch(error){
        res.status(401).json({error:"Unauthorized"});
    }
}


module.exports = {
    checkLogin,
    checkLoginWeb,
    isCreator
};