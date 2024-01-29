const db = require('../lib/prisma');

const getAllCartoon = async(req,res) =>{
    try{
        const cartoonList = await db.cartoon.findMany();
        res.json(cartoonList)
    }catch(error){
        res.json(error)
    }
}

module.exports = {
    getAllCartoon,
}