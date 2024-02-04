const express = require('express');
const router = express.Router();

// Import your controllers here
const { getallUsers, insertUser} = require('./Controllers/users');
const { getAllCartoon, getRecAll , getRecByGenre, getCartoon } = require('./Controllers/cartoon');
const { testupload } = require('./Controllers/fortest');
// Import your middleware here

// Define your routes here
router.get('/', (req, res) => {
    res.send('Hello from Kotlin Jetpack Compose API!');
});
router.get('/users', getallUsers)

// Cartoon
router.get('/allCartoon', getAllCartoon)
router.get('/recCartoon', getRecAll)
router.get('/getRecByGenre/:genreid', getRecByGenre)
router.get('/Cartoon/:cartoonid',getCartoon)

// User
router.get('/all')
router.post('/testupload', testupload);
router.post('/signUp', insertUser);


module.exports = router;
