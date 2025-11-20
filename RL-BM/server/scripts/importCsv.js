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

const importCsv = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Read CSV file
    const csvPath = path.join(__dirname, '../../product_keys.csv');

    if (!fs.existsSync(csvPath)) {
      console.error(`ERROR: CSV file not found at ${csvPath}`);
      process.exit(1);
    }

    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.trim().split('\n');

    // Skip header row
    const dataLines = lines.slice(1);

    console.log(`Found ${dataLines.length} product keys to import`);

    let imported = 0;
    let skipped = 0;
    let errors = 0;

    // Helper function to get type from key
    const getProductTypeFromKey = (key) => {
      const cleanKey = key.replace(/-/g, '').toUpperCase();
      let asciiSum = 0;
      for (let i = 0; i < cleanKey.length; i++) {
        asciiSum += cleanKey.charCodeAt(i);
      }
      const remainder = asciiSum % 3;
      if (remainder === 0) return 'methods';
      else if (remainder === 1) return 'specialist';
      else return 'both';
    };

    for (const line of dataLines) {
      const key = line.split(',')[0].trim();

      if (!key) {
        console.warn(`Skipping invalid line: ${line}`);
        skipped++;
        continue;
      }

      try {
        // Check if key already exists
        const existing = await ProductKey.findOne({ key: key.toUpperCase() });

        if (existing) {
          console.log(`Key already exists: ${key}`);
          skipped++;
          continue;
        }

        // Create new product key (type is calculated from key)
        await ProductKey.create({
          key: key.toUpperCase(),
          used: false
        });

        const keyType = getProductTypeFromKey(key);
        console.log(`Imported: ${key} (type: ${keyType})`);
        imported++;
      } catch (err) {
        console.error(`Error importing ${key}: ${err.message}`);
        errors++;
      }
    }

    console.log('\n--- Import Summary ---');
    console.log(`Total lines: ${dataLines.length}`);
    console.log(`Imported: ${imported}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Errors: ${errors}`);

    await mongoose.connection.close();
    console.log('\nMongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
};

importCsv();
