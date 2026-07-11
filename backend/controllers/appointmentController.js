const Appointment = require('../models/Appointment');

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res) => {
  try {
    const { pet, doctor, date, time, type, reason } = req.body;

    if (!pet || !doctor || !date || !time || !type || !reason) {
      return res.status(400).json({ message: 'Please provide all appointment details' });
    }

    const appointment = await Appointment.create({
      user: req.user.id,
      pet,
      doctor,
      date,
      time,
      type,
      reason,
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Server error booking appointment' });
  }
};

// @desc    Get user appointments
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id }).sort({ date: -1, time: -1 });
    res.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Server error fetching appointments' });
  }
};
