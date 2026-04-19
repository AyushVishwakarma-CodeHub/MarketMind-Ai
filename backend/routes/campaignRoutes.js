const express = require('express');
const { getCampaigns } = require('../controllers/campaignController');

const router = express.Router();

// GET /api/campaigns
router.get('/', getCampaigns);

module.exports = router;
