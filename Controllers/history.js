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
                    include:{
                        genres:true,
                        creator:{
                            include:{
                                user:true
                            }
                        }
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
                        name:true
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
        // console.log(datahis.length)
        if(datahis.length===0){
            try{
                const inserthisfun = await db.history.create({
                    data:{
                        userId:parseInt(userid),
                        cartoonId:parseInt(cartoonid),
                        episodeId:findcartoonep[0].id,
                        viewDate:new Date()
                    }
                })
                res.json(inserthisfun)
            }catch(error){
                res.json("error e sus")
            }
            
        }else{
            
            
            if(datahis[0].episode.episodeNumber >= epnum){
                // console.log("don't change episode number")
            }else{
                // console.log("change episode")
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
        }
        
        
    }catch(error){
        res.status(500).json(error)
    }

}


module.exports = {
    getHistory,
    chechistory
}