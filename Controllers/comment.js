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

module.exports = {
    getAllComment
}