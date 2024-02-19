const db = require('../lib/prisma');

// const getcurrentHistory = async(req,res)=>{
//     const userid = req.params.uid
//     const cartoonid = req.params.cid
//     const epid = req.params.eid
//     try {
//         const history = await db.history.findMany({
//             where:{
//                 userId:parseInt(userid),
//                 cartoonId:parseInt(cartoonid),
//                 episodeId:parseInt(epid)
//             }
//         })
//         res.json(history)
//     }
//     catch(error){
//         res.status(500).json(error)
//     }

// }


const getHistory = async(req, res)=>{
    const userid = req.params.uid
    try {
        const history = await db.history.findMany({
            where:{
                userId:parseInt(userid)
            },
            orderBy:{
                viewDate:'desc',
            },
            include:{
                cartoon:{
                    select:{
                        name:true,
                        creator:{
                            select:{
                                user:{
                                    select:{
                                        name:true
                                    }
                                }
                            }
                        },
                    }
                },
                user:{
                    select:{
                        name:true,
                    }
                },
                episode:{
                    select:{
                        episodeNumber:true,
                    }
                }
                
                
            }
        })

        console.log(history)
        res.json(history[0])
    }
    catch(error){
        res.status(500).json(error)
    }
}

module.exports = {
    getHistory
}