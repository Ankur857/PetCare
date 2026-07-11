const Feedback = require('../models/Feedback');

// @desc    Create a new feedback review
// @route   POST /api/feedback
// @access  Private
exports.createFeedback = async (req, res) => {
  try {
    const { doctor, rating, review } = req.body;

    if (!doctor || !rating) {
      return res.status(400).json({ message: 'Please provide doctor name and rating' });
    }

    const feedback = await Feedback.create({
      user: req.user.id,
      doctor,
      rating,
      review,
      date: new Date().toLocaleDateString(),
    });

    res.status(201).json(feedback);
  } catch (error) {
    console.error('Create feedback error:', error);
    res.status(500).json({ message: 'Server error saving feedback' });
  }
};

// @desc    Get all feedback reviews
// @route   GET /api/feedback
// @access  Private
exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error('Get feedbacks error:', error);
    res.status(500).json({ message: 'Server error fetching feedbacks' });
  }
};
