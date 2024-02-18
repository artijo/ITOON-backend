const db = require('../lib/prisma');

const newEpisode = async (req, res) => {
    const { title, cartoonid, episode } = req.body;
    try {
        const newEP = await db.episode.create({
            data: {
                name: title,
                cartoonId: Number(cartoonid),
                episodeNumber: Number(episode),
                thumbnail: req.files.cover[0].path,
                releaseDate: new Date(),
            }
        })
        const newImage = await db.image.createMany({
            data: req.files.images.map((file,index) => {
                return {
                    url: file.path,
                    episodeId: newEP.id,
                    name: file.originalname.split('.')[0],
                    page: index+1
                };
            })
        });
        res.json(newEP)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

const getEpByCartoonID = async (req, res) => {
    const { cartoonid } = req.params;
    //getlastep
    try {
        const lastEp = await db.episode.findFirst({
            where: {
                cartoonId: Number(cartoonid)
            },
            orderBy: {
                episodeNumber: 'desc'
            }
        });
        res.json(lastEp)
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    newEpisode,
    getEpByCartoonID
}