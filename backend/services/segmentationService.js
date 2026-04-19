const Customer = require('../models/Customer');

/**
 * Segmentation Rules:
 * - High Value: total_spent > 5000
 * - Inactive: last_purchase_date > 30 days ago
 * - New: created_at within last 7 days
 * - Regular: everyone else
 *
 * Priority: High Value > Inactive > New > Regular
 */

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Classify a single customer into a segment
 */
const classifyCustomer = (customer) => {
  const now = new Date();
  const lastPurchase = new Date(customer.last_purchase_date);
  const createdAt = new Date(customer.created_at);
  const daysSinceLastPurchase = now - lastPurchase;
  const daysSinceCreated = now - createdAt;

  if (customer.total_spent > 5000) {
    return 'High Value';
  }

  if (daysSinceLastPurchase > THIRTY_DAYS_MS) {
    return 'Inactive';
  }

  if (daysSinceCreated <= SEVEN_DAYS_MS) {
    return 'New';
  }

  return 'Regular';
};

/**
 * Run segmentation on all customers in the database
 */
const runSegmentation = async () => {
  const customers = await Customer.find();
  const bulkOps = customers.map((customer) => ({
    updateOne: {
      filter: { _id: customer._id },
      update: { $set: { segment: classifyCustomer(customer) } },
    },
  }));

  if (bulkOps.length > 0) {
    await Customer.bulkWrite(bulkOps);
  }

  return { processed: customers.length };
};

/**
 * Get customers grouped by segment
 */
const getSegmentedCustomers = async () => {
  const segments = ['High Value', 'Inactive', 'New', 'Regular'];
  const result = {};

  for (const segment of segments) {
    const customers = await Customer.find({ segment });
    result[segment] = {
      count: customers.length,
      customers,
    };
  }

  return result;
};

/**
 * Get segment summary counts
 */
const getSegmentSummary = async () => {
  const pipeline = [
    {
      $group: {
        _id: '$segment',
        count: { $sum: 1 },
        avgSpent: { $avg: '$total_spent' },
        totalSpent: { $sum: '$total_spent' },
      },
    },
    { $sort: { count: -1 } },
  ];

  const results = await Customer.aggregate(pipeline);
  return results.map((r) => ({
    segment: r._id,
    count: r.count,
    avgSpent: Math.round(r.avgSpent * 100) / 100,
    totalSpent: Math.round(r.totalSpent * 100) / 100,
  }));
};

module.exports = {
  classifyCustomer,
  runSegmentation,
  getSegmentedCustomers,
  getSegmentSummary,
};
