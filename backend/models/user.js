const mongoose = require('mongoose');
const validator = require('validator');
const { urlRegex } = require('../utils/utils');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 30,
      minlength: 2,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      maxlength: 30,
      minlength: 2,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(v) {
          return urlRegex.test(v);
        },
        message: 'Url is not correct.',
      },
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate: {
        validator(v) {
          return validator.isEmail(v);
        },
        message: 'Email is not correct.',
      },
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
