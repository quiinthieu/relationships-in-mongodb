const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    authors: [{
        type: Schema.Types.ObjectId,
        ref: 'Author'
    }]
}, {
    timestamps: true
});


module.exports = mongoose.model('Article', articleSchema);