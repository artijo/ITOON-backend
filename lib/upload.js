let multer = require('multer');
let path = require('path');

//handdle storage using multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function(req, file, cb){
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
  });
  var upload = multer({storage: storage});

  module.exports = upload;