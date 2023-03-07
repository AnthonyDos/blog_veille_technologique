const express = require('express');
const router = express.Router();
const authCtrl = require('../controller/authenticationController');
const multer = require ('../middleware/multer-config');


router.post('/signup', multer, authCtrl.singup);
router.post('/login',  authCtrl.login);

module.exports = router;