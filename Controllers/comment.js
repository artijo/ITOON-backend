const { log } = require('console');
const db = require('../lib/prisma');

// const getAllComment = async(req,res) => {
//     const findepid = req.params.episodeNumber
//     const findcartoon = req.params.cartoonId
//     console.log(findepid)
//     console.log(findcartoon)
//     try{
//         const commentList = await db.comment.findMany({
//             include:{
//                 episode : {
//                     select : {
//                         episodeNumber:true,
//                         cartoonId:true
//                     }
//                 }             
//             }
//         })
//         // console.log(commentList)
//         for(var i=0;i<=commentList.length;i++){
//             var data = commentList[i]
//             // console.log(data.episode.episodeNumber)
//             // var querycom = ""
//             console.log(data)
//             const cartoonlist = await db.$queryRaw`SELECT name FROM cartoon WHERE id = ${data.episode.cartoonId}`
//             if(data.episode.episodeNumber==find){
//                 const comment = await db.$queryRaw`SELECT * FROM comment WHERE episodeId = ${data.episodeId}`
//                 console.log(comment)
//             }
//             console.log(cartoonlist)
//         }
//         console.log(cartoonlist)
//         res.json(reslut)
//         // console.log(reslut)
//     }catch(error){
//         res.json(error)
//     }
// }

const getEpcomment = async(req,res) => {
    const cartoonid = req.params.cid
    const epid = req.params.eid
    try{
        const comment = await db.comment.findMany({
            where:{
                episodeId:parseInt(epid)
            },
            include:{
                episode:{
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
                        }
                    }
                }
            }
    })
    console.log(comment)
    res.json(comment)
    }catch(error){
        res.status(500).json(error)
    }
}

const insertComment = async (req, res) => {
    const comment = req.body;
    console.log(comment)
    try {
        const newComment = await db.comment.create({
            data:{
                content : comment.content,
                userId: Number(comment.userId),
                episodeId : Number(comment.episodeId),
            }
        });
        res.json(newComment);
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = {
    insertComment,
    getEpcomment
}