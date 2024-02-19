const { join } = require('@prisma/client/runtime/library');
const db = require('../lib/prisma');
const upload = require('../lib/upload');
const { on } = require('nodemon');


const getAllCartoon = async(req,res) => {
    try{
        const cartoonList = await db.cartoon.findMany({
            include:{
                genres: true,
                creator:{
                    include:{
                        user:true
                    }
                }
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
                genres:true,
                creator:{
                    include:{
                        user:true
                    }
                }
            }
        })
        res.json(cartoonList)
    }catch(error){
        res.json(error)
    }
}

const getAllGenre = async(req,res) => {
    try{
        const genreList = await db.genre.findMany()
        res.json(genreList)
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

const uploadGartoon = async (req,res) => {
    // upload.single('thumbnail')(req,res,(err) => {
    //     if(err){
    //         res.json(err)
    //     }
    //     else{
    //         res.json(req.file)
    //     }
    // })
    try{
        const {name,description, type} = req.body
        const newCartoon = await db.cartoon.create({
            data:{
                name,
                description,
                releaseDate: new Date(),
                thumbnail: req.file.path,
                totalEpisodes: 0,
                creatorId: req.creatorId,
                genreId: Number(type)
            }
        })
        console.log(newCartoon.createdAt)
        res.json(newCartoon)
    }
    catch(error){
        res.status(500).json(error)
        console.log(error)
    }
}

const updateCartoon = async (req,res) => {
    const {cartoonid} = req.params
    const {name,description, episode, type} = req.body
    try{
        const updateCartoon = await db.cartoon.update({
            where:{
                id:Number(cartoonid)
            },
            data:{
                name,
                description,
                totalEpisodes: Number(episode),
                genreId: Number(type),
                thumbnail: req.file.path
            }
        })
        res.json(updateCartoon)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

const getEpCartoon = async (req,res) => {
    try{
        const {cartoonid} = req.params
        const callEp = await db.episode.findMany({
            where:{
                cartoonId:Number(cartoonid)
            },
            orderBy:{
                episodeNumber:'desc'
            },
            include:{
                cartoon:{
                    select:{
                        totalEpisodes:true
                    }
                }
            }
        })
        res.json(callEp)
    }catch(error){
        res.status(500).json(error)
        console.log(error)
    }
}

const searchCartoon = async (req,res) => {
    const find = req.params.name
    const sfind = "%"+find+"%"
    console.log(find)
    try{
        // const result = await db.$queryRaw`SELECT * FROM cartoon JOIN genre ON cartoon.genreId = genre.id 
        // JOIN creator ON cartoon.creatorId = creator.id JOIN user ON creator.userId = user.id  WHERE cartoon.name LIKE ${sfind}
        //   `;   
        // const getgenre = getGenreByid(result.id)

        // // console.log(getall)
        const result = await db.cartoon.findMany({
            where:{
                name:{
                    contains:find
                }
            },
            include:{
                genres:true,
                creator:{
                    include:{
                        user:true
                    }
                }
            }
        })
        res.json(result)
    }catch(error){
        res.json(error)
    }
    
}


const getImageEp = async (req,res) =>{
    const  episodeId  = req.params.epId
    try{
        const imageEp = await db.image.findMany({
            where:{
                episodeId: Number(episodeId)
            },
            orderBy:{
                page:'asc'
            },
        })
        res.json(imageEp)
    }catch(error){
        res.status(500).json(error)
    }
} 

module.exports = {
    getAllCartoon,
    getRecAll,
    getRecByGenre,
    getCartoon,
    uploadGartoon,
    getEpCartoon,
    getAllGenre,
    searchCartoon,
    getImageEp,
    updateCartoon
}