const Identifier = require('../models/identifier');
const User = require('../models/user');

const router = require('express').Router();

router.route('/').get(async (req, res) => {
    try {
        const identifiers = await Identifier.find().populate("user");
        res.json(identifiers);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
})
router.route('/:id').get(async (req, res) => {
    try {
        const identifier = await Identifier.findById(req.params.id).populate("user");
        res.json(identifier);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
})
router.route('/:id').delete(async (req, res) => {
    try {
        const identifier = await Identifier.findByIdAndDelete(req.params.id);
        await User.findByIdAndDelete(identifier.user);
        res.json(`Identifier deleted!`);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
})

module.exports = router;