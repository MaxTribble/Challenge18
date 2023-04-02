const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  addFriend,
  removeFriend,
  deleteUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;