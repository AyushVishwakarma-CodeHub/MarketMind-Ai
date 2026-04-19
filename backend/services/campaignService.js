const Customer = require('../models/Customer');
const { getSegmentSummary } = require('./segmentationService');

/**
 * Campaign templates per segment
 */
const CAMPAIGN_TEMPLATES = {
  'High Value': {
    title: 'Premium Upsell Campaign',
    recommendation: 'Upsell premium products and exclusive memberships',
    explanation:
      'These customers have spent over ₹5,000, showing strong purchase intent and brand loyalty. They are most receptive to premium offerings and exclusive deals.',
    conversionRate: 0.15,
  },
  Inactive: {
    title: 'Re-engagement Campaign',
    recommendation: 'Offer 15–20% discount to re-engage inactive users',
    explanation:
      'Users inactive for 30+ days are at high risk of churning. A timely discount can reignite their interest and bring them back before they switch to a competitor.',
    conversionRate: 0.08,
  },
  New: {
    title: 'Welcome Campaign',
    recommendation: 'Send personalized welcome offer with first-purchase bonus',
    explanation:
      'New customers are in the exploration phase. A warm welcome offer builds trust, encourages the first repeat purchase, and sets the foundation for long-term loyalty.',
    conversionRate: 0.12,
  },
  Regular: {
    title: 'Loyalty Boost Campaign',
    recommendation: 'Introduce loyalty rewards program to increase engagement',
    explanation:
      'Regular customers form your stable base. A loyalty program incentivizes repeat purchases and can gradually elevate them to high-value status.',
    conversionRate: 0.1,
  },
};

/**
 * Business-type specific customizations
 */
const BUSINESS_CUSTOMIZATIONS = {
  food: {
    'High Value': {
      recommendation: 'Offer exclusive tasting events and premium meal subscriptions',
      bestTime: '6:00 PM – 9:00 PM (Dinner Rush)',
    },
    Inactive: {
      recommendation: 'Send a "We miss you!" offer with 20% off on their favorite cuisine',
      bestTime: '11:30 AM – 1:00 PM (Lunch Hour)',
    },
    New: {
      recommendation: 'Welcome combo meal deal with free dessert on first order',
      bestTime: '6:00 PM – 9:00 PM (Dinner Rush)',
    },
    Regular: {
      recommendation: 'Introduce a meal punch card – buy 9 meals, get 1 free',
      bestTime: '12:00 PM – 2:00 PM (Lunch)',
    },
  },
  gym: {
    'High Value': {
      recommendation: 'Offer personal training packages and premium membership upgrades',
      bestTime: '6:00 AM – 8:00 AM & 5:00 PM – 8:00 PM',
    },
    Inactive: {
      recommendation: 'Offer a free 1-week trial pass to bring them back to the gym',
      bestTime: '6:00 AM – 8:00 AM (Morning Motivation)',
    },
    New: {
      recommendation: 'Free fitness assessment + 1 personal training session',
      bestTime: '5:00 PM – 8:00 PM (After Work)',
    },
    Regular: {
      recommendation: 'Group class referral bonus – bring a friend, get a month free',
      bestTime: '6:00 AM – 8:00 AM & 5:00 PM – 8:00 PM',
    },
  },
  clothing: {
    'High Value': {
      recommendation: 'Early access to new collections + VIP shopping events',
      bestTime: 'Saturday – Sunday (Weekend Sales)',
    },
    Inactive: {
      recommendation: 'Flash sale alert: 25% off storewide this weekend only',
      bestTime: 'Friday Evening (Pre-Weekend)',
    },
    New: {
      recommendation: 'Welcome discount: 15% off your first purchase + free styling tips',
      bestTime: 'Saturday – Sunday (Weekend Shopping)',
    },
    Regular: {
      recommendation: 'Seasonal wardrobe refresh campaign with mix-and-match bundles',
      bestTime: 'Saturday – Sunday (Weekend Sales)',
    },
  },
};

/**
 * Default best time suggestions
 */
const DEFAULT_BEST_TIMES = {
  'High Value': 'Weekday evenings (6–9 PM)',
  Inactive: 'Late morning (10 AM – 12 PM)',
  New: 'Early afternoon (1–3 PM)',
  Regular: 'Weekday evenings (5–8 PM)',
};

/**
 * Calculate revenue prediction for a segment
 */
const calculateRevenue = (targetUsers, conversionRate, avgOrderValue) => {
  return Math.round(targetUsers * conversionRate * avgOrderValue * 100) / 100;
};

/**
 * Generate campaign recommendations with revenue predictions
 */
const generateCampaigns = async (businessType = null) => {
  const segmentSummary = await getSegmentSummary();
  const totalCustomers = await Customer.countDocuments();

  const campaigns = segmentSummary.map((segment) => {
    const template = CAMPAIGN_TEMPLATES[segment.segment];
    if (!template) return null;

    const businessConfig =
      businessType && BUSINESS_CUSTOMIZATIONS[businessType]
        ? BUSINESS_CUSTOMIZATIONS[businessType][segment.segment]
        : null;

    const conversionRate = template.conversionRate;
    const avgOrderValue = segment.avgSpent;
    const targetUsers = segment.count;
    const expectedRevenue = calculateRevenue(targetUsers, conversionRate, avgOrderValue);

    return {
      segment: segment.segment,
      targetUsers,
      campaign: {
        title: template.title,
        recommendation: businessConfig
          ? businessConfig.recommendation
          : template.recommendation,
        explanation: template.explanation,
        bestTime: businessConfig
          ? businessConfig.bestTime
          : DEFAULT_BEST_TIMES[segment.segment],
      },
      revenue: {
        conversionRate: `${(conversionRate * 100).toFixed(0)}%`,
        avgOrderValue: Math.round(avgOrderValue),
        expectedRevenue,
      },
    };
  });

  const validCampaigns = campaigns.filter(Boolean);
  const totalExpectedRevenue = validCampaigns.reduce(
    (sum, c) => sum + c.revenue.expectedRevenue,
    0
  );

  return {
    businessType: businessType || 'general',
    totalCustomers,
    totalExpectedRevenue: Math.round(totalExpectedRevenue * 100) / 100,
    campaigns: validCampaigns,
  };
};

module.exports = {
  generateCampaigns,
};
