const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString(),
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Feedback', feedbackSchema);
