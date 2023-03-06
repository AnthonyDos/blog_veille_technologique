const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    userId: { type: Number, required: true },
    name: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    tag: { type: String, required: true},
    likeCount: { type: Number, required: true },
});

module.exports = mongoose.model('post', articleSchema);