const express = require('express');
const router = express.Router();
const upload = require('./lib/upload');

// Import your controllers here

const { getallUsers, insertUser, loginWeb ,getUserbyID, loginApp ,updateProfile, insertCreator} = require('./Controllers/users');
const { getAllCartoon, getRecAll, getCartoon, getRecByGenre, uploadGartoon, getEpCartoon, getAllGenre,searchCartoon, getImageEp} = require('./Controllers/cartoon');
const { newEpisode, getEpByCartoonID} = require('./Controllers/episode');
const { getAllComment,insertComment} = require('./Controllers/comment');
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
}
);
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
router.get('/getAllEpCartoon/:cartoonid',getEpCartoon)
router.post('/newcartoon',checkLoginWeb, isCreator, upload.single('thumbnail'), uploadGartoon);
router.get('/allgenre',getAllGenre)
router.get('/searchCartoon/:name',searchCartoon)
// Episode
router.post('/newEpisode',checkLoginWeb,isCreator,upload.fields([{name:'cover'},{name:'images'}]), newEpisode);
router.get('/getImageEp/:epId',getImageEp)

//Comment
router.get('/comments',getAllComment)
router.post('/insertcomment',insertComment)
router.get('/getlastep/:cartoonid',getEpByCartoonID)

//payment
router.post('/webhook',express.raw({type: "application/json"}), webhook)
router.post('/checkout',checkout)

module.exports = router;
