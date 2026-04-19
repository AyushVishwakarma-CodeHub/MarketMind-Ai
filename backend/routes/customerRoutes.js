const express = require('express');
const { getCustomers } = require('../controllers/customerController');

const router = express.Router();

// GET /api/customers
router.get('/', getCustomers);

module.exports = router;
