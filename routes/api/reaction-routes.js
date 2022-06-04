const router = require('express').Router();

const {
    addReaction,
    removeReaction
} = require('../../controllers/reaction-Controller')

router
    .route('/:thoughtId/reactionId')
    .post(addReaction)
    .delete(removeReaction);
module.exports = router;
