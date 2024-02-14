const db = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getallUsers = async (req, res) => {
    try {
        const users = await db.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.json(error);
    }
}

const getUserbyID = async(req,res) => {
    const {id} = req.params
    try{
        const usersId = await db.user.findUnique({
            where:{
                id:Number(id)
            }
        })
        res.json(usersId)  
    } catch(error){
        res.json(error);
    }
}

const loginWeb = async (req, res) => {
    const userData = req.body;
    try {
        const user = await db.user.findUnique({
            where: {
                email: userData.email
            }
        });
        if (user) {
            const isPasswordMatch = bcrypt.compareSync(userData.password, user.password);
            if (isPasswordMatch) {
                const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
                res.json({ token });
            } else {
                res.status(400).json({ message: 'Invalid password' });
            }
        } else {
            res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(400).json(error);
    }
}


const insertUser = async (req, res) => {
    const userData = req.body;
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    const hash = bcrypt.hashSync(userData.password, salt);
    
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
                password: hash,
                phone: userData.phone
            }
        });
        res.json(newUser);
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(400).json(error);
    }
};

const loginApp = async (req,res) =>{
    const email = req.params.email
    const password = req.params.password
    if(!email || !password){
        return res.status(400).json({message:"Please enter email and password"})
    }
    try{
        const users = await db.user.findUnique({
            where:{
                email:email
            }
        })
        if(users){
            const passwordMatch = bcrypt.compareSync(password,users.password)
            if(passwordMatch){
                res.json(users)
            }else{
                res.status(400).json({message:"Password incorrect."})
            }
        }else{
            res.status(400).json({message:"There is no user using this email."})
        }
    }catch (error) {
        console.error('Error logging in:', error);
        res.status(400).json(error);
    }
}

const updateProfile = async(req,res)=>{
    const update_id = req.params.id
    const info = req.body
    if(!update_id){
        res.status(400).json(error);
    }
    try{
       
        const users = await db.user.update(

            {
                where:{
                    id:Number(update_id)
                },
                
                data:{
                    email:info.email,
                    name:info.name,
                    password:info.password,
                    phone:info.phone
                }
            }
        )
        res.json(users)
    }catch(error){
        res.status(400).json(error);
    }
}




module.exports = {
    getallUsers,
    insertUser,
    getUserbyID,
    loginWeb,
    loginApp,
    updateProfile
}