const user = require('../models/User');
const errorMessage = require('../config/errorMessage/errorMessage');

exports.allUsers = ( req, res, next ) => {
    console.log(res)
    user.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error: error, message: errorMessage.errorAllUsersNotFound }))
}