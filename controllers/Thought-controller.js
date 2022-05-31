// we need to import both models since thpughts are associated to the user 
const { Thought, User} = require('../models');

// Performs CRUD operations on thought 
const thoughtController = {
    // TODO:
    // add thought to user
    addThought ({params}, body){
        // console.log(params)
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id:params.userId},
                { $push: { comments: _id} },
                { new: true}
            );
        })
        .then(dbUserData => {
            // console.log(dbUserData)
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
        
    },

    // add reaction to thought

    // remove a thought

    // update a thought

};

 module.exports = thoughtController;