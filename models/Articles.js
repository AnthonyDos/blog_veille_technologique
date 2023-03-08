const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    tag: { type: String, required: true},
    likeCount: { type: Number, default: 0 },
    comments:[]
});

module.exports = mongoose.model('article', articleSchema);