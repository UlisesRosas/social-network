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
    .get(getAllThoughts);
    
    router
    .route('/:thoughtId')
    .get(getThoughtById);
    
    router
    .route('/:id')
    .put(updateThought)
    .post(addThought);
    
    router
    .route('/:userId/:thougthId')
    .delete(removeThought);

module.exports = router;