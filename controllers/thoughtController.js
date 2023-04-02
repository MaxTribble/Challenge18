const { Thought, User } = require('../models');

module.exports = {

  // return all thoughts
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    // get single thought by id, id is passed in params
    getThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought matching that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // find a single user by id in params / then add thought
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => {
          return User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
          );
        })
        .then((user) =>
          !user
            ? res.status(404).json({
                message: 'Thought created but no user with that ID',
              })
            : res.json('Created the thought!')
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
    });
    },

    // find a single thought by id in params and update with new body
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought matching this id' })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    // find a single thought and remove it then find user and remove the thought from that user as well
    deleteThought(req, res) {
      Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that id' })
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((user) =>
          !user
            ? res.status(404).json({
                message: 'Thought created but no user with that id!',
              })
            : res.json({ message: 'Thought was successfully deleted' })
        )
        .catch((err) => res.status(500).json(err));
    },

    // find one thought by id given in params then add to reactions
    addReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that id' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // find on thought by id in params then pull the reaction matching that id
    removeReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId }}},
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that id!' })
            : res.json(application)
        )
        .catch((err) => res.status(500).json(err));
    },
  };