const db = require('../lib/prisma');

const getAllComment = async(req,res) => {
    try{
        const commentList = await db.comment.findMany({
            include:{
                episode : {
                    select : {
                        episodeNumber:true
                    }
                }
            }
        })
        res.json(commentList)
        console.log(commentList)
    }catch(error){
        res.json(error)
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
    getAllComment,
    insertComment
}