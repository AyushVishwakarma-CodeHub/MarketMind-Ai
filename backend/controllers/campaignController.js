const { generateCampaigns } = require('../services/campaignService');

/**
 * GET /api/campaigns
 * Return campaign suggestions + revenue predictions + explanations
 * Query params: businessType (food | gym | clothing)
 */
const getCampaigns = async (req, res) => {
  try {
    const { businessType } = req.query;

    // Validate business type if provided
    const validTypes = ['food', 'gym', 'clothing'];
    if (businessType && !validTypes.includes(businessType.toLowerCase())) {
      return res.status(400).json({
        error: `Invalid business type. Use one of: ${validTypes.join(', ')}`,
      });
    }

    const campaigns = await generateCampaigns(
      businessType ? businessType.toLowerCase() : null
    );

    res.json(campaigns);
  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({ error: 'Server error generating campaigns.' });
  }
};

module.exports = { getCampaigns };
