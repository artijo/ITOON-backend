const db = require('../lib/prisma');

const getallUsers = async (req, res) => {
    try {
        const users = await db.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.json(error);
    }
}

const insertUser = async (req, res) => {
    const userData = req.body;
    
    try {
        const findusers = await db.user.findMany();
        let userid = 1;
        findusers.forEach(index =>{
            if(index.id > userid){
                userid = index.id;
            }else{
                return userid;
            }
        })
        const newid = userid+1;
        const newUser = await db.user.create({
            data:{
                id: newid,
                email: userData.email,
                name: userData.name,
                password: userData.password,
                phone: userData.phone
            }
        });
        res.json(newUser);
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(400).json(error);
    }
};




module.exports = {
    getallUsers,
    insertUser
}