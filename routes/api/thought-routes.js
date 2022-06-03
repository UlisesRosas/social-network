const router = require('express').Router();

// imports all the controllers for thoughts
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    removeThought,
    updateThought
} = require('../../controllers/thought-controller')

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought);

router
    .route('/:thougthId/:userId')
    .delete(removeThought)

module.exports = router;