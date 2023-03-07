const fs = require('fs'); 
const Articles = require('../models/Articles');
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

exports.findOneArticle = ( req, res, next ) => {
    Articles.findOne({ _id: req.params._id })
    .then( article => res.status(200).json(article))
    .catch(error => res.status(404).json({ error : error, message: errorMessage.errorFindOneArticle + " " + req.params._id }))
}