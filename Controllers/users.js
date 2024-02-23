const db = require('../lib/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

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
            const id = users.id
            const name = users.name
            if(passwordMatch){
                res.json({id,email,name,"success":1})
            }else{
                res.status(400).json({message:"Password incorrect.","success":0})
            }
        }else{
            res.status(400).json({message:"There is no user using this email.","success":0})
        }
    }catch (error) {
        console.error('Error logging in:', error);
        res.status(400).json({error,"success":0});
    }
}

const updateProfile = async(req,res)=>{
    const update_id = req.params.id
    const info = req.body
    if(!update_id){
        res.status(400).json({error,"success":0});
    }
    try{
        if(info.email == "" && info.name == ""){
            res.status(401).json({error,"success":0})
        }else{
        const updateusers = await db.user.update(
            {
                where:{
                    id:Number(update_id)
                },
                
                data:{
                    email:info.email,
                    name:info.name,
                }
            }
        )
        res.json({updateusers,"success":1})
    }
    }catch(error){
        res.status(400).json({error,"success":0});
    }
}

const insertCreator = async(req,res)=>{
    const info = req.body
    try{
        const users = await db.user.findUnique({
            where:{
                id:Number(info.id)
            }
        });
        if(users){
            const passwordMatch = bcrypt.compareSync(info.password,users.password)
            if(passwordMatch){
            const creator = await db.creator.create({
                data:{
                    userId: info.id
                }
            });
            res.json({creator,"success":1})
            }else{
                res.json({message:"The password is incorrect"})
            }
        }else{
            res.json({message:"There is no user using this email"})
        }
    }catch(error){
        res.status(500).json(error)
    }
}


const isFav = async(req,res) => {
    const id = req.params.id;
    const cId = req.params.cartoonId;
    try{
        const isFav = await db.favoriteCartoon.findFirst({
            where:{
                userId:Number(id),
                cartoonId:Number(cId)
            }
        })
        if(!isFav){
            return res.json({message:0})
        }else{
            return res.json({message:1})
        }
        
    }catch(error){
        return res.status(500).json(error)
    }
}


const insertFav = async(req,res) => {
    const id = req.params.id;
    const cId = req.params.cartoonId;
    const data_now  = new Date();
    try{
        await prisma.favoriteCartoon.create({
            data:{
                userId:Number(id),
                cartoonId:Number(cId),
                favoriteDate:data_now
            }
        })
        res.json({message:1})
    }catch(error){
        res.status(500).json(error)
    }
}

const unFav = async(req,res) => {
    const id = req.params.id;
    const cId = req.params.cartoonId;
    try{
        // QQ for primary key

        const fav = await db.favoriteCartoon.findFirst({
            where:{
                userId:Number(id),
                cartoonId:Number(cId)
            }
        })

        await db.favoriteCartoon.delete({
            where:{
                id:Number(fav.id) //use primary key for delete
            }
        })
        res.json({message:0})
    }catch(error){
        res.status(500).json(error)
    }
}


const showFav = async(req,res) => {
    
    console.log(req.params)
    const userId = req.params.uid
    console.log(userId)
    try{
        const showfav = await db.favoriteCartoon.findMany({
            where:{
                userId:Number(userId)
            },
            orderBy:{
                favoriteDate:'desc',
            },
            include:{
                cartoon:{
                    include:{
                        genres:true,
                        creator:{
                            include:{
                                user:true
                            }
                        }
                    }
                },
                user:true
            }
        })
        console.log(showfav)
        res.json(showfav)
    }catch(error){
        res.status(500).json(error)
    }


}

const creatorRegister = async(req,res)=>{
    const {userId} = req.body
    try{
        const creator = await db.creator.create({
            data:{
                userId:Number(userId)
            }
        })
        res.json(creator)
}catch(error){
    res.status(500).json(error)
}
}

const getCreator = async(req,res)=>{
    const {userId} = req.params
    try{
        const creator = await db.creator.findFirst({
            where:{
                userId:Number(userId)
            },
            include:{
                user:true
            }
        })
        res.json(creator)
    }
    catch(error){
        res.status(500).json(error)
    }
}

const getallCreator = async(req,res)=>{
    try{
        const creator = await db.creator.findMany({
            include:{
                user:true
            }
        })
        res.json(creator)
    }
    catch(error){
        res.status(500).json(error)
    }
}

const appoveCreator = async(req,res)=>{
    const {userId} = req.params
    try{
        const creator = await db.creator.update({
            where:{
                userId:Number(userId)
            },
            data:{
                status:"verified"
            }
        })
        res.json(creator)
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {
    getallUsers,
    insertUser,
    getUserbyID,
    loginWeb,
    loginApp,
    updateProfile,
    insertCreator,
    insertFav,
    unFav,
    isFav,
    showFav,
    creatorRegister,
    getCreator,
    getallCreator,
    appoveCreator
}