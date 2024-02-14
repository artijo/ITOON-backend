const db = require('../lib/prisma');

const getAllComment = async(req,res) => {
    try{
        const commentList = await db.comment.findMany({
        })
        res.json(commentList)
    }catch(error){
        res.json(error)
    }
}

const insertComment = async (req, res) => {
    const comment = req.body;
    try {
        const newComment = await db.comment.create({
            comment:{
                id: comment.user.id,
                content : comment.content,
                episode : comment.episode.id
            },
            include:{
                user:true,
                episode:true
            }
        });
        res.json(newComment);
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = {
    getAllComment
}