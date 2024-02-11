const upload = require('../lib/upload');
const uploadmutiple = require('../lib/uploadmutiple');

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

const testuploadmutiple = (req, res) => {
    uploadmutiple.array('image')(req, res, (err) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(req.files);
        }
    })
}

module.exports = {
    testupload
}