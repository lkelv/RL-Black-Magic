import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';
import mongoose from 'mongoose';
import ProductKey from '../models/ProductKey.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

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
      const parts = line.split(',').map(s => s.trim());
      const key = parts[0];
      const usedStr = parts[1] || 'False';
      const isUsed = usedStr.toLowerCase() === 'true';

      if (!key) {
        console.warn(`Skipping invalid line: ${line}`);
        skipped++;
        continue;
      }

      try {
        // Check if key already exists
        const existing = await ProductKey.findOne({ key: key.toUpperCase() });

        if (existing) {
          // Update used status if it changed
          if (existing.used !== isUsed) {
            existing.used = isUsed;
            if (isUsed && !existing.usedAt) {
              existing.usedAt = new Date();
            }
            await existing.save();
            console.log(`Updated: ${key} (used: ${isUsed})`);
          } else {
            console.log(`Key already exists: ${key}`);
          }
          skipped++;
          continue;
        }

        // Create new product key (type is calculated from key)
        await ProductKey.create({
          key: key.toUpperCase(),
          used: isUsed,
          usedAt: isUsed ? new Date() : null
        });

        const keyType = getProductTypeFromKey(key);
        console.log(`Imported: ${key} (type: ${keyType}, used: ${isUsed})`);
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
