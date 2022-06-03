const { User } = require('../models');

// perform CRUD for User 
const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one user by ObjectId
    // gets the id from the params so use params as one of the two functin parameters
    getUserById({params}, res) {
        // this is the field in which the id is located
        User.findOne({ _id: params.id })
        // this is to populate the Thought model in to the user model
        .populate({
            path: 'thought',
            // it excludes this field
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            // if no user is found 
            if(!dbThoughtData){
                res.status(404).json({ message: 'No User was found by this ID!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // creates a new user
    addUser({body}, res){
        User.create({body})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // update a user
    updateUser({params, body}, res){
        User.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, returnValidators: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID'})
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    
    // delete a user 
    removeUser({params}, res){
        User.findOneAndDelete(
            {_id: params.id}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }

}

module.exports = userController;