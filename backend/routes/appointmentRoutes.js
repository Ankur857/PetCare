const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments } = require('../controllers/appointmentController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createAppointment);
router.get('/', protect, getAppointments);

module.exports = router;
