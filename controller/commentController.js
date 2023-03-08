const Comments = require("../models/Comments");
const errorMessage = require('../config/errorMessage/errorMessage');
const Article = require("../models/Articles");

exports.createComment = async(req, res, next) => {
    const { userId,content } = req.body;
    const query = { _id: req.params.id };
    const newComment = new Comments({
                userId: userId,
                articleId: query,
                content: content
           })
    const updates = {
        $push: { comments: newComment}
    };
    let collection = await Article.findOne({ _id: req.params._id });
    await collection.updateOne(updates)
    .then(() => res.status(201).json({message: "commentaire créé !"}))
    .catch(error => res.status(404).json({ error : error, message: errorMessage.errorCreateComment }))
};