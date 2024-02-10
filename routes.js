const express = require('express');
const router = express.Router();

// Import your controllers here
const { getallUsers, insertUser } = require('./Controllers/users');
const { getAllCartoon, getRecAll, getCartoon, getRecByGenre} = require('./Controllers/cartoon');
const { testupload } = require('./Controllers/fortest');
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
router.post('/testupload', testupload);
router.post('/signUp', insertUser);
router.post('/login',checkLogin)
router.get('/getRecByGenre/:genreid', getRecByGenre)
router.get('/Cartoon/:cartoonid',getCartoon)

module.exports = router;
