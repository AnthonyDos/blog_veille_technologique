const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    userId: { type: String, required: true },
    user:{
        type: Object
    },
    name: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    tag: { type: String, required: true},
    likeCount: { type: Number, default: 0 },
    dislikes: { type: Number , default: 0},
    usersLiked: { type: [String] , required: true},
    usersDisliked: { type: [String], required: true},
    comments:[],
    date: {type: Date}
});

module.exports = mongoose.model('article', articleSchema);