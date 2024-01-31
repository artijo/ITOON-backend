const express = require('express');
const router = express.Router();

// Import your controllers here
const { getallUsers } = require('./Controllers/users');
const { getAllCartoon, getRecAll , getRecByGenre } = require('./Controllers/cartoon');
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


router.get('/all')



module.exports = router;
