const db = require('../lib/prisma');

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
                        thumbnail:true,
                        description:true,
                        releaseDate:true,
                        totalEpisodes:true
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
        // console.log(history)
        res.json(history)
    }
    catch(error){
        res.status(500).json(error)
    }
}


const chechistory = async (req, res) => {
    const userid = req.params.uid
    const cartoonid = req.params.cid
    const epnum = req.params.epnum
    console.log(req.params)
    var check = false
    try{
        const datahis = await db.history.findMany(
            {
                where:{
                    userId:parseInt(userid),
                    cartoonId:parseInt(cartoonid)
                },
                include:{
                    episode:{
                        select:{
                            episodeNumber:true,
                        }
                    }
                }
            }
        )
      
        const findcartoonep = await db.episode.findMany(
            {
                where:{
                    episodeNumber:parseInt(epnum),
                    cartoonId:parseInt(cartoonid)
                },
                select:{
                    id:true
                }
            }
        )
        
        if(datahis[0].episode.episodeNumber >= epnum){
            console.log("don't change episode number")
        }else{
            console.log("change episode")
            check = true
        }
        
        if (check) {
            try{
                const updatehisfun = await db.history.update({
                    where: {
                        id:datahis[0].id
                    },
                    data:{
                        viewDate:new Date(),
                        episodeId:findcartoonep[0].id
                    }
                })
                res.json(updatehisfun)
            }catch(error){
                res.json(error)
            }
        }else{
            res.status(200).json("success")
        }
        
    }catch(error){
        res.status(500).json(error)
    }

}


module.exports = {
    getHistory,
    chechistory
}