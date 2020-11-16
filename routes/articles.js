const Article = require('../models/article');
const router = require('express').Router();

router.route('/').get(async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.route('/:id').get()