const express = require('express');
const router = express.Router();
const upload = require('./lib/upload');

// Import your controllers here
const { getHistory,chechistory} = require('./Controllers/history');
const { getallUsers, insertUser, loginWeb ,getUserbyID, loginApp ,updateProfile, insertCreator, insertFav, unFav, isFav, showFav, creatorRegister, getCreator, getallCreator, appoveCreator,forgotPassword,getUserbyIDWeb,findallemail} = require('./Controllers/users');
const { getAllCartoon, getRecAll, getCartoon, getRecByGenre, uploadGartoon, getEpCartoon, getAllGenre,searchCartoon, getImageEp, updateCartoon, boughtCartoon, buyCartoon, getBoughtCartoon, getCartoonByCreator, deleteCartoon, sliderCartoon } = require('./Controllers/cartoon');
const { newEpisode, getEpByCartoonID, updateEpisode, getEpbyID, deleteEpisode} = require('./Controllers/episode');
const {insertComment, getEpcomment, getUsercomment} = require('./Controllers/comment');
const { webhook, checkout  } = require('./Controllers/payment');
// Import your middleware here
const { checkLogin,checkLoginWeb, isCreator, isAdmin } = require('./Middlewares/auth');

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
    res.json({ status:'ok',message: 'Authorized',creatorId:req.creatorId });
});
router.post('/authcheckadmin', checkLoginWeb, isAdmin, (req, res) => {
    res.json({ status:'ok',message: 'Authorized' });
});
router.get('/users/:email/:password',loginApp)
router.put('/profile/:id',updateProfile)
router.post('/users/creator/',insertCreator)
router.post('/creator/reg',creatorRegister)
router.get('/creator/:userId',getCreator)
router.get('/allcreator',checkLoginWeb, isAdmin,getallCreator)
router.put('/creator/:userId',checkLoginWeb, isAdmin,appoveCreator)
router.post('/forgotpassword',forgotPassword)
router.get('/user/web',getUserbyIDWeb)
router.get('/findallemail',findallemail)

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
router.get('/boughtCartoon/:cartoonid/:userId',boughtCartoon)
router.get('/getboughtcartoon/:uid',getBoughtCartoon)
router.post('/cartoon/buy',buyCartoon)
router.get('/cartoonbycreator/:creatorid',getCartoonByCreator)
router.delete('/deletecartoon/:cartoonid', checkLoginWeb, isCreator,deleteCartoon)
router.get('/sliderCartoon',sliderCartoon)

// Episode
router.post('/newEpisode',checkLoginWeb,isCreator,upload.fields([{name:'cover'},{name:'images'}]), newEpisode);
// router.post('/newEpisode',checkLoginWeb,isCreator,uploadr2.fields([{name:'cover'},{name:'images'}]), newEpisode);
router.put('/updateEpisode/:episodeid',checkLoginWeb,isCreator,upload.fields([{name:'cover'},{name:'images'}]),updateEpisode)
router.get('/getImageEp/:epId',getImageEp)
router.get('/getEpbyID/:episodeid',getEpbyID)
router.delete('/deleteEpisode/:episodeid', checkLoginWeb, isCreator ,deleteEpisode)

//Comment
router.get('/comments/:cid/:eid',getEpcomment)
router.get('/usercomment/:uid',getUsercomment)
router.post('/insertcomment',insertComment)
router.get('/getlastep/:cartoonid',getEpByCartoonID)

//payment
router.post('/webhook',express.raw({type: "application/json"}), webhook)
router.post('/checkout',checkout)

//history
router.get('/allhistory/:uid',getHistory)
router.get('/edithistory/:uid/:cid/:epnum',chechistory)


// Fav
router.get('/fav/:id/:cartoonId', isFav)
router.get('/favInsert/:id/:cartoonId', insertFav)
router.delete('/fav/:id/:cartoonId', unFav)
router.get('/showfav/:uid',showFav)


module.exports = router;
