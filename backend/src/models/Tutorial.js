const mongoose = require('mongoose');
const { unlink } = require('../routes/tutorials');

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
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    authorEmail: {
      type: String,
      default: 'unknown'
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

module.exports = mongoose.model('Tutorial', tutorialSchema);
