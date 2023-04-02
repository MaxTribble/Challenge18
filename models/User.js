const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,

    },
      email: {
        type: String,
        unique: true,
        required: true,
    },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'thought',
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );

const User = model('user', userSchema);

module.exports = User;