const express = require('express');
const router = express.Router();
const upload = require('./lib/upload');

// Import your controllers here
const { getallUsers, insertUser, loginWeb } = require('./Controllers/users');
const { getAllCartoon, getRecAll, getCartoon, getRecByGenre, uploadGartoon} = require('./Controllers/cartoon');
// Import your middleware here
const { checkLogin,checkLoginWeb, isCreator } = require('./Middlewares/auth');

// Define your routes here
router.get('/', (req, res) => {
    res.send('Hello from Kotlin Jetpack Compose API!');
});
router.get('/users', getallUsers)
router.post('/loginweb', loginWeb)
router.post('/authcheckweb', checkLoginWeb, isCreator, (req, res) => {
    res.json({ status:'ok',message: 'Authorized' });
}
);

// Cartoon
router.get('/allCartoon', getAllCartoon)
router.get('/recCartoon', getRecAll)
router.get('/all')
router.post('/signUp', insertUser);
router.post('/login',checkLogin)
router.get('/getRecByGenre/:genreid', getRecByGenre)
router.get('/Cartoon/:cartoonid',getCartoon)
router.post('/newcartoon',checkLoginWeb, isCreator, upload.single('thumbnail'), uploadGartoon);

module.exports = router;
