const db = require('../lib/prisma');
const upload = require('../lib/upload');


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
        const {name,description, episode, type} = req.body
        const newCartoon = await db.cartoon.create({
            data:{
                name,
                description,
                releaseDate: new Date(),
                thumbnail: req.file.path,
                totalEpisodes: Number(episode),
                creatorId: req.creatorId,
                genreId: Number(type)
            }
        })
        res.json(newCartoon)
    }
    catch(error){
        res.status(500).json(error)
        console.log(error)
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
        const result = await db.$queryRaw`SELECT * FROM cartoon WHERE name LIKE ${sfind}  `;
        res.json(result)
    }catch(error){
        res.json(error)
    }
    
}


const getImageEp = async (req,res) =>{
    const  { episodeId }  = req.params  
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
    }catch{
        res.status(500).json(error)
        console.log(error)
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
    searchCartoon
}