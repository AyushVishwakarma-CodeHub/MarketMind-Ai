const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Customer email is required'],
    trim: true,
    lowercase: true,
  },
  last_purchase_date: {
    type: Date,
    required: [true, 'Last purchase date is required'],
  },
  total_spent: {
    type: Number,
    required: [true, 'Total spent is required'],
    min: 0,
  },
  segment: {
    type: String,
    enum: ['High Value', 'Inactive', 'New', 'Regular'],
    default: 'Regular',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Customer', customerSchema);
