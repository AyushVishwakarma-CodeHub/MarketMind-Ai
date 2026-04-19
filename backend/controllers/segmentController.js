const { getSegmentedCustomers, getSegmentSummary } = require('../services/segmentationService');

/**
 * GET /api/segments
 * Return segmented users grouped by segment type
 */
const getSegments = async (req, res) => {
  try {
    const { summary } = req.query;

    if (summary === 'true') {
      const segmentSummary = await getSegmentSummary();
      return res.json({ segments: segmentSummary });
    }

    const segmentedCustomers = await getSegmentedCustomers();
    res.json({ segments: segmentedCustomers });
  } catch (error) {
    console.error('Get segments error:', error);
    res.status(500).json({ error: 'Server error fetching segments.' });
  }
};

module.exports = { getSegments };
