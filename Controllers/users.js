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
        
        const newUser = await db.user.create({
            data:{
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




module.exports = {
    getallUsers,
    insertUser,
    loginWeb
}