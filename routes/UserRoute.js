const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/userController');
const auth = require('../middleware/auth');



router.get('/', auth, userCtrl.allUsers);

module.exports = router;