const db = require('../lib/prisma');

const newEpisode = async (req, res) => {
    const { title, cartoonid } = req.body;
    console.log(cartoonid)
    try {
        const newEP = await db.episode.create({
            data: {
                name: title,
                cartoonId: Number(cartoonid),
                episodeNumber: 1,
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
        res.json(error)
    }
}

module.exports = {
    newEpisode
}