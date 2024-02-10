const express = require('express');
const router = express.Router();
const upload = require('./lib/upload');

// Import your controllers here
const { getallUsers, insertUser } = require('./Controllers/users');
const { getAllCartoon, getRecAll, getCartoon, getRecByGenre, uploadGartoon} = require('./Controllers/cartoon');
const { checkLogin } = require('./Middlewares/auth');
// Import your middleware here

// Define your routes here
router.get('/', (req, res) => {
    res.send('Hello from Kotlin Jetpack Compose API!');
});
router.get('/users', getallUsers)

// Cartoon
router.get('/allCartoon', getAllCartoon)
router.get('/recCartoon', getRecAll)
router.get('/all')
router.post('/signUp', insertUser);
router.post('/login',checkLogin)
router.get('/getRecByGenre/:genreid', getRecByGenre)
router.get('/Cartoon/:cartoonid',getCartoon)
router.post('/newcartoon', upload.single('thumbnail'), uploadGartoon);

module.exports = router;
