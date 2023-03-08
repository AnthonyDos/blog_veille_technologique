const express = require('express');
const router = express.Router();
const articleCtrl = require("../controller/articleController");
const commentCtrl = require('../controller/commentController');
const multer = require('../middleware/multer-config');
const auth = require("../middleware/auth");

//articles
router.post("/", multer, auth, articleCtrl.createArticle);
router.get("/:_id", articleCtrl.findOneArticle);
router.get("/", articleCtrl.findAllArticles);
router.put("/update/:_id", auth, multer, articleCtrl.updateArticle);
router.delete("/delete/:_id", auth, articleCtrl.deleteArticle);

//comments
router.patch("/:_id/comment/", auth, commentCtrl.createComment);
router.patch("/:_id/comment/:_id", auth)

module.exports = router;