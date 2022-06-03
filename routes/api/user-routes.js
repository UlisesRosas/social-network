const router = require('express').Router();
// destructure all of the user controllers
const {
    getAllUsers,
    getUserById,
    caddUser

}= require('../../controllers/user-controller');

router

module.exports = router;