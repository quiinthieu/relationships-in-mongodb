const LibraryCard = require('../models/libraryCard');

const router = require('express').Router();

router.route('/').get(async (req, res) => {
    try {
        const libraryCards = await LibraryCard.find();
        res.json(libraryCards);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
})

module.exports = router;