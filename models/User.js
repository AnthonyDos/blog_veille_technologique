const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    gender: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minLength: 8 },
    image: { type: String, required: true },
    category: { type: String, required: true },
    numberComment: { type: Number, default: 0},
    isAdmin: { type: Boolean, required: true, default: false } 
});


module.exports = mongoose.model('User', userSchema);