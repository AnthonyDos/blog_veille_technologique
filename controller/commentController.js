const Comments = require("../models/Comments");
const errorMessage = require('../config/errorMessage/errorMessage');
const Article = require("../models/Articles");
const User = require("../models/User");

exports.createComment = async(req, res, next) => {
    const { userId,content } = req.body;
    const idArticle = { _id: req.params.id };
    const userData = await User.findOne({ _id: userId })
    const newComment = new Comments({
        userId: userId,
        user: userData,
        articleId: idArticle,
        content: content
    })
    await User.updateOne({ _id: userId },{$inc: {numberComment: 1}})
    const updates = {
        $push: { comments: newComment}
    };
    let collection = await Article.findOne({ _id: req.params._id });
    await collection.updateOne(updates)
    
    .then(() => res.status(201).json({message: "commentaire créé !"}))
    .catch(error => res.status(404).json({ error : error, message: errorMessage.errorCreateComment }))
};


