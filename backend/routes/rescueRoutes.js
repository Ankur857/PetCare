const express = require('express');
const router = express.Router();
const { createRescue, getRescues } = require('../controllers/rescueController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createRescue);
router.get('/', protect, getRescues);

module.exports = router;
