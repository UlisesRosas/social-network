const { Thought, User } = require('../models');



const reactionController = {

    // add reaction to thought
    addReaction({ params, body }, res) {
        console.log(body)
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: params.thougthId }},
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.jsonZ(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // delete reaction from thougth
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.reactionId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }

}

module.exports = reactionController;