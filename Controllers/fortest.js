const upload = require('../lib/upload');

const testupload = (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(req.file);
        }
    })
}

module.exports = {
    testupload
}