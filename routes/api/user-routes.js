const router = require('express').Router();
// destructure all of the user controllers
const {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    removeUser

}= require('../../controllers/user-controller');

// all routes that donot require an ID
router
    .route('/')
    .get(getAllUsers)
    .post(addUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(removeUser);
module.exports = router;