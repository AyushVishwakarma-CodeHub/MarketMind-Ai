const express = require('express');
const { getSegments } = require('../controllers/segmentController');

const router = express.Router();

// GET /api/segments
router.get('/', getSegments);

module.exports = router;
