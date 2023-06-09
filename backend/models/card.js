const mongoose = require('mongoose');
const { urlRegex } = require('../utils/utils');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 30,
      minlength: 2,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v) => urlRegex.test(v),
        message: 'Url is not correct!',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

module.exports = mongoose.model('card', cardSchema);
