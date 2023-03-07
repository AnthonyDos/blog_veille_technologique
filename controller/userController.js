const user = require('../models/User');
const errorMessage = require('../config/errorMessage/errorMessage');

exports.allUsers = ( req, res, next ) => {
    console.log(res)
    user.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error: error, message: errorMessage.errorAllUsersNotFound }))
}

exports.findOneUser = ( req, res, next ) => {
    user.findOne({ _id: req.params._id})
    .then(oneUser => res.status(200).json(oneUser))
    .catch(error => res.status(404).json({ error: errorMessage.errorGetOneUser }))
}

exports.updateUser = ( req, res, next ) => {
    user.updateOne({ _id: req.params._id }, { ...req.body, _id: req.params._id})
    .then(()=> res.status(200).json({ message: "user modifié !"}))
    .catch( error => res.status(400).json({ error: errorMessage.errorUpdateUser }))
}

exports.deleteUser = ( req, res, next) => {
    user.deleteOne({ _id: req.params._id })
    .then(()=> res.status(200).json({ message: "utilisateur supprimé !"}))
    .catch(error => res.status(400).json({ error: errorMessage.errorDeleteUser }))
}