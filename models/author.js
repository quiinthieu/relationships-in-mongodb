const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: {type: String, required: true},
    articles: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }]
}, {
    timestamps: true
});


module.exports = mongoose.model('Author', authorSchema);