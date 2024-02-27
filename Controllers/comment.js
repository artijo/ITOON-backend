const { log } = require('console');
const db = require('../lib/prisma');


const getEpcomment = async(req,res) => {
    const cartoonid = req.params.cid
    const epid = req.params.eid
    try{
        const comment = await db.comment.findMany({
            where:{
                episodeId:parseInt(epid)
            },
            orderBy:{
                createdAt:'desc',
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
                },
                user:true
            }
    })
    res.json(comment)
    }catch(error){
        res.status(500).json(error)
    }
}

const getUsercomment = async(req,res) => {
    const userid = req.params.uid
    try{
        const comment = await db.comment.findMany({
            where:{
                userId:parseInt(userid)
            },
            orderBy:{
                createdAt:'desc',
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
                },
                user:true
            }
    })
    res.json(comment)
    }catch(error){
        res.status(500).json(error)
    }
}

const insertComment = async (req, res) => {
    const comment = req.body;
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
    getEpcomment,
    getUsercomment
}