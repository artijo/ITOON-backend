const express = require('express');
const router = express.Router();
const upload = require('./lib/upload');
const {uploadr2} = require('./lib/r2');

// Import your controllers here

const { getallUsers, insertUser, loginWeb ,getUserbyID, loginApp ,updateProfile, insertCreator} = require('./Controllers/users');
const { getAllCartoon, getRecAll, getCartoon, getRecByGenre, uploadGartoon, getEpCartoon, getAllGenre,searchCartoon, getImageEp, updateCartoon} = require('./Controllers/cartoon');
const { newEpisode, getEpByCartoonID, updateEpisode} = require('./Controllers/episode');
const { getAllComment,insertComment, getEpcomment} = require('./Controllers/comment');
const { webhook, checkout  } = require('./Controllers/payment');
// Import your middleware here
const { checkLogin,checkLoginWeb, isCreator } = require('./Middlewares/auth');

// Define your routes here
router.get('/', (req, res) => {
    res.send('Hello from Kotlin Jetpack Compose API!');
});
router.get('/users', getallUsers)
router.get('/users/:id',getUserbyID)
router.post('/loginweb', loginWeb)
router.post('/authcheckweb', checkLoginWeb, (req, res) => {
    res.json({ status:'ok',message: 'Authorized' });
});
router.post('/authcheckcreator', checkLoginWeb, isCreator, (req, res) => {
    res.json({ status:'ok',message: 'Authorized' });
});
router.get('/users/:email/:password',loginApp)
router.put('/profile/:id',updateProfile)
router.post('/users/creator/',insertCreator)

// Cartoon
router.get('/allCartoon', getAllCartoon)
router.get('/recCartoon', getRecAll)
router.get('/all')
router.post('/signUp', insertUser);
router.post('/login',checkLogin)
router.get('/getRecByGenre/:genreid', getRecByGenre)
router.get('/Cartoon/:cartoonid',getCartoon)
router.put('/Cartoon/:cartoonid',checkLoginWeb, isCreator, upload.single('thumbnail'),updateCartoon)
router.get('/getAllEpCartoon/:cartoonid',getEpCartoon)
router.post('/newcartoon',checkLoginWeb, isCreator, upload.single('thumbnail'), uploadGartoon);
router.get('/allgenre',getAllGenre)
router.get('/searchCartoon/:name',searchCartoon)
// Episode
router.post('/newEpisode',checkLoginWeb,isCreator,upload.fields([{name:'cover'},{name:'images'}]), newEpisode);
// router.post('/newEpisode',checkLoginWeb,isCreator,uploadr2.fields([{name:'cover'},{name:'images'}]), newEpisode);
router.put('/updateEpisode/:episodeid',checkLoginWeb,isCreator,upload.fields([{name:'cover'},{name:'images'}]),updateEpisode)
router.get('/getImageEp/:epId',getImageEp)

//Comment
router.get('/comments/:cid/:eid',getEpcomment)
router.post('/insertcomment',insertComment)
router.get('/getlastep/:cartoonid',getEpByCartoonID)

//payment
router.post('/webhook',express.raw({type: "application/json"}), webhook)
router.post('/checkout',checkout)

module.exports = router;
