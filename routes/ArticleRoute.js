const express = require('express');
const router = express.Router();
const articleCtrl = require("../controller/articleController");
const multer = require('../middleware/multer-config');
const auth = require("../middleware/auth");

router.post("/", multer, auth, articleCtrl.createArticle);
router.get("/:_id", articleCtrl.findOneArticle);

module.exports = router;