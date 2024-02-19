// const { R2 } = require('node-cloudflare-r2');
// const multer = require('multer');
// let path = require('path');

// const r2 = new R2({
//     accountId: '2162d4098465aa35df60d58e8ce97529',
//     accessKeyId: 'bf02b49cbe335fc4419b52c0e78c964e',
//     secretAccessKey: 'eb668527d102180e0395501aa04d1ba08e0f130121cd1e73b35b2cc52fcc53f4',
// });

// const bucket = r2.bucket('itoon');

// // Set your bucket's public URL
// bucket.provideBucketPublicUrl('https://itoon-image.artijo.com/');

// bucket.exists().then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.error('Bucket does not exist', err);
// });

// const storager2 = multer.memoryStorage(
//     {
//       destination: function (req, file, cb) {
//         if(file.fieldname === 'images'){
//           cb(null, 'uploads/episode')
//         }
//         else if(file.fieldname === 'thumbnail'){
//           cb(null, 'uploads')
//         }else{
//           cb(null, 'uploads')
//         }
//       },
//       filename: function(req, file, cb){
//         cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
//       }
//     }
//   );
//   const uploadr2 = multer({ storage: storager2 });

// module.exports = {
//     uploadr2,
//     bucket
// }