const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/userController');
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');


//exports.signup = router.post('/signup', multer, userCtrl.singup);
router.get('/users')

module.exports = router;