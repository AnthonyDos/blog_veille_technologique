const fs = require('fs'); 
const Articles = require('../models/Articles');
const Comments = require('../models/Comments');
const errorMessage = require('../config/errorMessage/errorMessage');


exports.createArticle = ( req, res, next ) => {
    const { userId, name, content, tag } = req.body;
    
    const newArticle = new Articles({
        userId: userId,
        name: name,
        content: content,
        image: req.file.filename,
        tag:tag
    })

    newArticle.save()
    .then(article => res.status(201).json({ article: article, message: "article enregistré"}))
    .catch(error => res.status(400).json({ error : error, message: errorMessage.errorCreateArticle }))
}

exports.findOneArticle = async ( req, res, next ) => {
    const test = Comments.findById({'article': req.params._id})
    console.log(test)
    Articles.findOne({ _id: req.params._id }).populate("comments")
    
    .then( article => res.status(200).json(article))
    .catch(error => res.status(404).json({ error : error, message: errorMessage.errorFindOneArticle + " " + req.params._id }))
}

exports.findAllArticles = ( req, res, next ) => {
    Articles.find()
    .then(articles => res.status(200).json(articles))
    .catch(error => res.status(404).json({ error : error, message: errorMessage.errorFindAllArticle }))
}

exports.updateArticle = ( req, res, next ) => {
    const { userId, name, content, tag } = req.body;
    const articleObject = req.file ? 
    {
        userId: userId,
        name: name,
        content: content,
        image: req.file.filename,
        tag:tag
    } : { ...req.body };
    Articles.updateOne({ _id: req.params._id}, { ...articleObject, _id: req.params._id })
    .then(()=> res.status(200).json({ message: "article modifié !"}))
    .catch(error => res.status(400).json({ error: error, message: errorMessage.errorUpdateArticle }))
}

exports.deleteArticle = ( req, res, next ) => {
    Articles.findOne({ _id: req.params._id })
    .then( article => {
        const filename = article.image.split('/images/')[1];
        fs.unlink(`images/${filename}`,() =>{ 
            Articles.deleteOne({ _id: req.params._id })
            .then(() => res.status(200).json({ message: "article supprimé !"}))
            .catch(error => res.status(400).json({ error: error, message: errorMessage.errorDeleteArticle }))
        })
    })
    .catch(error => res.status(500).json({ error: error, message: errorMessage.errorServer }))
}

exports.likeArticle = (req, res) => {
    const id = req.params._id;
    const userId = req.body.userId
    Articles.findOne({ _id: id})
    .then(article => {
        switch (req.body.like) {
            case 1:
                Articles.updateOne({_id: id}, {$inc:{likes: +1} ,$push:{usersLiked: userId}})
                .then(()=> res.status(200).json({ message: "like enregistré !"}))
                .catch(error => res.status(400).json({error: error, message: errorMessage.errorLike }))
                break;
                
            case 0 :
                if (article.usersDisliked.includes(req.body.userId)) { 
                    Articles.updateOne({_id: id}, {$inc:{dislikes: -1} ,$pull:{usersDisliked: userId}})
                    .then(() => res.status(200).json({message:'Dislike retiré !'}))
                    .catch(error => res.status(400).json({ error: error, message: errorMessage.errorDislike }));
                }else{
                    Articles.updateOne({_id: id}, {$inc:{likes: -1} ,$pull:{usersLiked: userId}})
                    .then(() => res.status(200).json({message:'Like retiré !'}))
                    .catch(error => res.status(400).json({ error: error, message: errorMessage.errorRemoveLike }));
                }
            
            case -1 :
                Articles.updateOne({_id: id}, {$inc:{dislikes: +1} ,$push:{usersDisliked: userId}})
                .then(() => res.status(200).json({message:"Tu n' aime pas l'article' !"}))
                .catch(error => res.status(400).json({ error: error }));
                break

            default:
                break;
        }
    })
}