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
    .route('/:Id')
    .post(addThought);
    
    router
    .route('/:thougthId/:userId')
    .put(updateThought)
    .delete(removeThought);

module.exports = router;