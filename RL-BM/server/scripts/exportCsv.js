require('dotenv').config({ path: '../.env' });
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const ProductKey = require('../models/ProductKey');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('ERROR: MONGODB_URI environment variable is not set.');
  console.error('Please create a .env file with your MongoDB Atlas connection string.');
  process.exit(1);
}

const exportCsv = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Get all product keys from database
    const productKeys = await ProductKey.find().sort({ key: 1 });

    if (productKeys.length === 0) {
      console.log('No product keys found in database.');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Build CSV content
    let csvContent = 'key,used\n';

    productKeys.forEach(pk => {
      const usedValue = pk.used ? 'True' : 'False';
      csvContent += `${pk.key},${usedValue}\n`;
    });

    // Write to CSV file
    const csvPath = path.join(__dirname, '../../product_keys.csv');
    fs.writeFileSync(csvPath, csvContent);

    console.log(`\n--- Export Summary ---`);
    console.log(`Total keys exported: ${productKeys.length}`);
    console.log(`Used keys: ${productKeys.filter(pk => pk.used).length}`);
    console.log(`Available keys: ${productKeys.filter(pk => !pk.used).length}`);
    console.log(`\nExported to: ${csvPath}`);

    await mongoose.connection.close();
    console.log('\nMongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Export failed:', error);
    process.exit(1);
  }
};

exportCsv();
