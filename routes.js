const express = require('express');
const router = express.Router();
const upload = require('./lib/upload');

// Import your controllers here
<<<<<<< Updated upstream
const { getAllCartoon, getRecAll, getCartoon, getRecByGenre, uploadGartoon, getEpCartoon, getAllGenre} = require('./Controllers/cartoon');
const { getallUsers, insertUser, loginWeb ,getUserbyID, loginApp ,updateProfile} = require('./Controllers/users');
=======
const { getAllCartoon, getRecAll, getCartoon, getRecByGenre, uploadGartoon, getEpCartoon, getAllGenre,searchCartoon} = require('./Controllers/cartoon');
const { getallUsers, insertUser, loginWeb ,getUserbyID, loginApp } = require('./Controllers/users');
>>>>>>> Stashed changes
const { newEpisode} = require('./Controllers/episode');
const { getAllComment} = require('./Controllers/comment');
// Import your middleware here
const { checkLogin,checkLoginWeb, isCreator } = require('./Middlewares/auth');

// Define your routes here
router.get('/', (req, res) => {
    res.send('Hello from Kotlin Jetpack Compose API!');
});
router.get('/users', getallUsers)
router.get('/users/:id',getUserbyID)
router.post('/loginweb', loginWeb)
router.post('/authcheckweb', checkLoginWeb, isCreator, (req, res) => {
    res.json({ status:'ok',message: 'Authorized' });
}
);
router.get('/users/:email/:password',loginApp)
router.put('/profile/:id',updateProfile)

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

//Comment
router.get('/comments',getAllComment)

module.exports = router;
