const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.applicationId })
        .then((application) =>
          !application
            ? res.status(404).json({ message: 'No application with that ID' })
            : res.json(application)
        )
        .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => {
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
          );
        })
        .then((user) =>
          !user
            ? res.status(404).json({
                message: 'Application created, but found no user with that ID',
              })
            : res.json('Created the application 🎉')
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.applicationId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No application with this id!' })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    deleteThought(req, res) {
      Thought.findOneAndRemove({ _id: req.params.applicationId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No application with this id!' })
            : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((user) =>
          !user
            ? res.status(404).json({
                message: 'Application created but no user with this id!',
              })
            : res.json({ message: 'Application successfully deleted!' })
        )
        .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.applicationId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No application with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.tagId } } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No application with this id!' })
            : res.json(application)
        )
        .catch((err) => res.status(500).json(err));
    },
  };