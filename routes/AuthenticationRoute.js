const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/authenticationController');
const multer = require ('../middleware/multer-config');


router.post('/signup', multer, userCtrl.singup);

module.exports = router;