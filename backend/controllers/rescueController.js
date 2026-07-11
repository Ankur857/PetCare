const Rescue = require('../models/Rescue');

// @desc    Create a new rescue report
// @route   POST /api/rescue
// @access  Private
exports.createRescue = async (req, res) => {
  try {
    const { image, description, location } = req.body;

    if (!image || !description || !location) {
      return res.status(400).json({ message: 'Please provide image, description and location' });
    }

    const rescue = await Rescue.create({
      user: req.user ? req.user.id : null,
      image,
      description,
      location,
    });

    res.status(201).json(rescue);
  } catch (error) {
    console.error('Create rescue error:', error);
    res.status(500).json({ message: 'Server error creating rescue report' });
  }
};

// @desc    Get all rescue reports
// @route   GET /api/rescue
// @access  Private
exports.getRescues = async (req, res) => {
  try {
    const rescues = await Rescue.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(rescues);
  } catch (error) {
    console.error('Get rescues error:', error);
    res.status(500).json({ message: 'Server error fetching rescue reports' });
  }
};
