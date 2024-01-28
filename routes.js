const express = require('express');
const router = express.Router();

// Import your controllers here
const { getallUsers } = require('./Controllers/users');

// Import your middleware here


// Define your routes here
router.get('/', (req, res) => {
    res.send('Hello from Kotlin Jetpack Compose API!');
});
router.get('/users', getallUsers)

module.exports = router;
