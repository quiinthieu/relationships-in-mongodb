const Person = require('../models/person').Person;
const LibraryCard = require('../models/libraryCard');

const router = require('express').Router();

router.route('/').get(async (req, res) => {
    try {
        const persons = await Person.find();
        res.json(persons);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
})

router.route('/:id').get(async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        res.json(person);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
})

router.route('/add').post(async (req, res) => {
    try {
        const newPerson = new Person({
            name: req.body.name
        });
        const person = await newPerson.save();
        const newLibraryCard = new LibraryCard({
            card_number: person._id.toString().toLowerCase(),
            person
        });
        await newLibraryCard.save();
        res.json(`Person added!`);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
})

// router.route('/:id').delete(async (req, res) => {
//     try {
//         const person = await Person.findByIdAndDelete(req.params.id);
//         await LibraryCard.findOneAndDelete({card_number: persons.})
//     }
// })

module.exports = router;