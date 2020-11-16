const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const identifierSchema = new Schema({
    code: {type: String, required: true, unique: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Identifier = mongoose.model('Identifier', identifierSchema);

module.exports = Identifier;