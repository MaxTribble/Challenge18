const { Thought, User } = require('../models');

module.exports = {

  // get all users and populate their friends and thoughts categories
  getUsers(req, res) {
    User.find().populate("thoughts", "friends")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // find one user by id passed in params
  getUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' }).populate("thoughts", "friends")
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a user with the given info
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // find user by id given in params then update user info
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No thought matching this id' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // find user by id given in params then delete user / then go into thoughts and delete all from that user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and all thoughts deleted' }))
      .catch((err) => res.status(500).json(err));
  },


  // this one is getting 2 parameters passed / the first param is the user / the 2nd param is the user they are adding as a friend / api/users/:userId/friends/:friendId
  addFriend({params}, res) {
    User.findOneAndUpdate({_id: params.id}, {$addToSet: { friends: params.friendId}}, {new: true}).populate("thoughts", "friends")
    .select('-__v')
    .then(user => {
        if (!user) {
            res.status(404).json({message: 'No potential friend with that ID'});
            return;
        }
    res.json(user);
    })
    .catch(err => res.json(err));
},

  // this is using the same route as adding a friend but pulling from friends with the 2nd param passed
  removeFriend({params}, res) {
    User.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}},{new: true})
    .select('-__v')
    .then(user => {
      if (!user) {
          res.status(404).json({message: 'No potential friend with that ID'});
          return;
      }
    res.json(user);
    })
    .catch(err => res.json(err));
  },
};
