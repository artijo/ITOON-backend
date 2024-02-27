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
        let {name,description, type, paid, price} = req.body
        if(paid == 'true') paid = true; else paid = false;
    
        const newCartoon = await db.cartoon.create({
            data:{
                name,
                description,
                releaseDate: new Date(),
                thumbnail: req.file.path,
                totalEpisodes: 0,
                creatorId: req.creatorId,
                genreId: Number(type),
                paid: paid,
                price: Number(price)
            }
        })
        res.json(newCartoon)
    }
    catch(error){
        res.status(500).json(error)
        console.log(error)
    }
}

const updateCartoon = async (req,res) => {
    const {cartoonid} = req.params
    let {name,description, type, paid, price} = req.body
    if(paid == 'true') paid = true; else paid = false;
    try{
        const updateCartoon = await db.cartoon.update({
            where:{
                id:Number(cartoonid)
            },
            data:{
                name,
                description,
                totalEpisodes: 0,
                genreId: Number(type),
                thumbnail: req.file.path,
                paid: paid,
                price: Number(price)
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

const boughtCartoon = async (req,res) => {
    const {cartoonid, userId} = req.params
    try{
        const bought = await db.buyCartoon.findFirst({
            where:{
                AND:[
                    {
                        userId: Number(userId)
                    },
                    {
                        cartoonId: Number(cartoonid)
                    }
                ]
            }
        })
        if(bought){
            res.json({status:'ok',message:'bought'})
        }
        else{
            res.json({status:'no',message:'not bought'})
        }
    }catch(error){
        res.status(500).json(error)
    }
}

const buyCartoon = async (req,res) => {
    const {cartoonid, userId} = req.body
    try{
        const getusercoin = await db.user.findUnique({
            where:{
                id: Number(userId)
            }
        })
        const getcartoonprice = await db.cartoon.findUnique({
            where:{
                id: Number(cartoonid)
            }
        })
        if(getusercoin.coin < getcartoonprice.price){
            res.json({status:'no',message:'not enough coin'})
        }
        else{
            const bought = await db.buyCartoon.create({
                data:{
                    userId: Number(userId),
                    cartoonId: Number(cartoonid)
                }
            })
            const updatecoin = await db.user.update({
                where:{
                    id: Number(userId)
                },
                data:{
                    coin:{
                        decrement: getcartoonprice.price
                    }
                }
            })
            const coinTransaction = await db.coinTransaction.create({
                data:{
                    userId: Number(userId),
                    amount: getcartoonprice.price,
                    purchasename: "Buy Cartoon "+getcartoonprice.name,
                    date: new Date(),
                    status: "complete"
                }
            })
            res.json({status:'ok',message:'bought'})
        }
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

const getBoughtCartoon = async(req,res) =>{
    const userid = req.params.uid
    try{
        const cartoonbought = await db.buyCartoon.findMany({
            where:{
                userId: parseInt(userid) 
            },
            include:{
                user:true
            },
            include:{
                cartoon:true
            }
        });
        res.json(cartoonbought);
    }catch(error){
        res.status(400).json(error)
    }
}

const getCartoonByCreator = async(req,res) => {
    const creatorid = req.params.creatorid
    try{
        const cartoonList = await db.cartoon.findMany({
            where:{
                creatorId: Number(creatorid)
            }
        })
        res.json(cartoonList)
    }catch(error){
        res.json(error)
    }
}

const deleteCartoon = async(req,res) => {
    const {cartoonid} = req.params
    try{
        const deleteCartoon = await db.cartoon.delete({
            where:{
                id: Number(cartoonid)
            }
        })
        res.json(deleteCartoon)
       
    }catch(error){
        console.log(error)
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
    updateCartoon,
    boughtCartoon,
    buyCartoon,
    getBoughtCartoon,
    getCartoonByCreator,
    deleteCartoon
}