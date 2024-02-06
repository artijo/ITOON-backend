const db = require('../lib/prisma');

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

module.exports = {
    checkLogin
};