const User = require('../models/user');
const Identifier = require('../models/identifier');
const router = require('express').Router();

router.route('/').get(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        res.status(400).json(`Error: ${e}`);
    }
})

router.route('/:id').get(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (e) {
        res.status(400).json(`error: ${e}`);
    }
})

router.route('/:id').delete(async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        await Identifier.findOneAndDelete({user: user._id});
        res.json(`User deleted!`);
    } catch (e) {
        res.status(400).json(`Error: ${e}`);
    }
})

router.route('/add').post(async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            age: Number(req.body.age),
            gender: req.body.gender
        });
        const user = await newUser.save();
        const newIdentifier = new Identifier({
            code: user._id.toString().substring(0, 10).toUpperCase(),
            user: user._id
        });
        await newIdentifier.save();
        res.json(`User added!`);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
})

router.route('/update/:id').post(async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            age: Number(req.body.age),
            gender: req.body.gender
        })
        res.json(`User updated!`);
    } catch (e) {
        res.status(400).json(`Error: ${err}`);
    }
})

module.exports = router;