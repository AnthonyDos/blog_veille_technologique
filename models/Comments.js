const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    article:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article'
    }
})

module.exports = mongoose.model('comments', commentSchema);