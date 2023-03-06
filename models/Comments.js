const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userId: { type: Number, required: true },
    postId: { type: Number, required: true },
    content: { type: String, required: true }
})

module.exports = mongoose.Schema('comments', commentSchema);