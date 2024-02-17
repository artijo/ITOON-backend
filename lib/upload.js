let multer = require('multer');
let path = require('path');

//handdle storage using multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(file.fieldname === 'images'){
        cb(null, 'uploads/episode')
      }
      else if(file.fieldname === 'thumbnail'){
        cb(null, 'uploads')
      }else{
        cb(null, 'uploads')
      }
    },
    filename: function(req, file, cb){
      cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
    }
  });
  var upload = multer({storage: storage});

  module.exports = upload;