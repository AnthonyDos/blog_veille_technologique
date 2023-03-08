const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/userController');
const auth = require('../middleware/auth');

router.get('/', auth, userCtrl.allUsers);
router.get('/:_id', auth, userCtrl.findOneUser);
router.put('/update/:_id', auth, userCtrl.updateUser);
router.delete('/delete/:_id', auth, userCtrl.deleteUser);



module.exports = router;