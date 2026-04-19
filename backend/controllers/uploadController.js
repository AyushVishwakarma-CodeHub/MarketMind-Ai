const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Customer = require('../models/Customer');
const { classifyCustomer, runSegmentation } = require('../services/segmentationService');

/**
 * POST /api/upload
 * Upload and parse CSV file, store customers in MongoDB
 */
const uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded. Please upload a CSV file.' });
    }

    const filePath = req.file.path;
    const customers = [];
    const errors = [];
    let rowIndex = 0;

    const stream = fs.createReadStream(filePath).pipe(csv());

    await new Promise((resolve, reject) => {
      stream
        .on('data', (row) => {
          rowIndex++;
          // Validate required fields
          if (!row.name || !row.email || !row.last_purchase_date || !row.total_spent) {
            errors.push(`Row ${rowIndex}: Missing required fields`);
            return;
          }

          const parsedDate = new Date(row.last_purchase_date);
          const parsedSpent = parseFloat(row.total_spent);

          if (isNaN(parsedDate.getTime())) {
            errors.push(`Row ${rowIndex}: Invalid date format for '${row.last_purchase_date}'`);
            return;
          }

          if (isNaN(parsedSpent)) {
            errors.push(`Row ${rowIndex}: Invalid total_spent value '${row.total_spent}'`);
            return;
          }

          customers.push({
            name: row.name.trim(),
            email: row.email.trim().toLowerCase(),
            last_purchase_date: parsedDate,
            total_spent: parsedSpent,
            created_at: new Date(),
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    if (customers.length === 0) {
      // Clean up uploaded file
      fs.unlinkSync(filePath);
      return res.status(400).json({
        error: 'No valid customer records found in CSV.',
        errors,
      });
    }

    // Clear existing customers and insert new ones
    await Customer.deleteMany({});
    const inserted = await Customer.insertMany(customers);

    // Run segmentation on all newly inserted customers
    await runSegmentation();

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    res.status(200).json({
      message: `Successfully uploaded ${inserted.length} customers.`,
      totalProcessed: rowIndex,
      totalInserted: inserted.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Server error during file upload.' });
  }
};

module.exports = { uploadCSV };
