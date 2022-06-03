// we need to import both models since thpughts are associated to the user 
const { Thought, User } = require('../models');

// Performs CRUD operations on thought 
const thoughtController = {
    // TODO:
    // add thought to user
    addThought({ params }, body) {
        // console.log(params)
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { comments: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                // console.log(dbUserData)
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));

    },

   

    // remove a thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete(
            { _id: params.thoughtId }
        )
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'Thought not found' })
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { nes: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this ID' })
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    },

    // update a thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this ID' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    }

};

module.exports = thoughtController;