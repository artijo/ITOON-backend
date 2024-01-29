const db = require('../lib/prisma');

const getallUsers = async (req, res) => {
    try {
        const users = await db.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.json(error);
    }
}




module.exports = {
    getallUsers
}