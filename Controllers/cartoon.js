const db = require('../lib/prisma');

const getAllCartoon = async(req,res) => {
    try{
        const cartoonList = await db.cartoon.findMany({
            include:{
                genres: true, // All post where genres = genre id in filed record cartoon?
            }
        })
        res.json(cartoonList)
    }catch(error){
        res.json(error)
    }
}

// Section of Genre
// Top five
// Rec is mean "Recommend" 
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
    const { genreid } = req.params
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

const getCartoon = async(req,res) => {
    const {cartoonid} = req.params
    try{
        const cartoons = await db.cartoon.findUnique({
            where:{
                id: Number(cartoonid)
            }
        })
        res.json(cartoons)
    }
    catch(error){
        res.status(500).json(error)
    }
}


module.exports = {
    getAllCartoon,
    getRecAll,
    getRecByGenre,
    getCartoon
}