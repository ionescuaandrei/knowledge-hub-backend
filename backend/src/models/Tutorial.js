const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000
    },
    published: {
      type: Boolean,
      default: false
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sourceLink: {
      type: String,
      trim: true
    },
    coverImage: {
      type: String, 
      default: null
    }
  }, {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);
