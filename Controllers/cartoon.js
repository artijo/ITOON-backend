const db = require('../lib/prisma');

const getAllCartoon = async(req,res) =>{
    try{
        const cartoonList = await db.cartoon.findMany({
            include:{
                genres: true, // All post where genres = genre id in filed record cartoon?
            }
        })
        console.log(cartoonList)
        res.json(cartoonList)
    }catch(error){
        res.json(error)
    }
}

module.exports = {
    getAllCartoon,
}