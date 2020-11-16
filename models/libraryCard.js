const mongoose = require('mongoose');
const personSchema = require('../models/person').personSchema;

const Schema = mongoose.Schema;

const libraryCardSchema = new Schema({
    card_number: {type: String, required: true, unique: true},
    person: personSchema,
}, {
    timestamps: true
});

const LibraryCard = mongoose.model('LibraryCard', libraryCardSchema);

module.exports = LibraryCard