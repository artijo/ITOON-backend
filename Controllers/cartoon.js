const db = require('../lib/prisma');


const getAllCartoon = async(req,res) => {
    try{
        const cartoonList = await db.cartoon.findMany({
            include:{
                genres: true,
            }
        })
        res.json(cartoonList)
    }catch(error){
        res.json(error)
    }
}


const getRecAll = async(req,res) => {
    try{
        const cartoonList = await db.cartoon.findMany({
            take: 5,
            include:{
                genres:true
            }
        })
        res.json(cartoonList)
    }catch(error){
        res.json(error)
    }
}


const getRecByGenre = async(req, res) => {
    const  { genreid }  = req.params
    console.log(genreid)
    try{
        const cartoonList = await db.cartoon.findMany({
            where:{
                genreId: Number(genreid)
            },
            include:{
                genres:true
            }
        })
        res.json(cartoonList)
    }catch(error){
        res.json(error)
    }
}




module.exports = {
    getAllCartoon,
    getRecAll,
    getRecByGenre,
}