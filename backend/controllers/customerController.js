const Customer = require('../models/Customer');

/**
 * GET /api/customers
 * Get all customers with optional segment filter
 */
const getCustomers = async (req, res) => {
  try {
    const { segment, page = 1, limit = 50 } = req.query;
    const filter = segment ? { segment } : {};

    const customers = await Customer.find(filter)
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Customer.countDocuments(filter);

    res.json({
      customers,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({ error: 'Server error fetching customers.' });
  }
};

module.exports = { getCustomers };
