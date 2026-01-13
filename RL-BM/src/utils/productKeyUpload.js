/*
This is ran **once** just to upload product keys from CSV files into the MongoDB database.
To run: node src/utils/productKeyUpload.js

Files should be in the root directory as MM.csv and SM.csv
*/


import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define Schema (Must match server.js)
const ProductKeySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  used: { type: Boolean, default: false },
  casId: { type: String, default: null }
});

const ProductKey = mongoose.model('ProductKey', ProductKeySchema);

async function uploadKeys() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Function to parse CSV and prepare data
    const processFile = (fileName, type) => {
      const filePath = path.resolve(process.cwd(), fileName);
      if (!fs.existsSync(filePath)) {
        console.warn(`Warning: ${fileName} not found.`);
        return [];
      }

      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split(/\r?\n/);
      const keys = [];

      lines.forEach(line => {
        if (!line.trim()) return;
        // Format: code, FALSE
        const parts = line.split(',');
        const key = parts[0].trim();
        // We ignore the FALSE part as schema default is false
        if (key) {
          keys.push({
            key: key.toUpperCase(),
            type: type,
            used: false,
            casId: null
          });
        }
      });
      return keys;
    };

    const methodKeys = processFile('MM.csv', 'methods');
    const specialistKeys = processFile('SM.csv', 'specialist');

    const allKeys = [...methodKeys, ...specialistKeys];

    if (allKeys.length === 0) {
      console.log('No keys found to upload.');
    } else {
      // Use bulkWrite for efficiency and to skip duplicates
      const operations = allKeys.map(k => ({
        updateOne: {
          filter: { key: k.key },
          update: { $setOnInsert: k },
          upsert: true
        }
      }));

      const result = await ProductKey.bulkWrite(operations);
      console.log(`Upload complete.`);
      console.log(`Inserted: ${result.upsertedCount}`);
      console.log(`Matched (Skipped): ${result.matchedCount}`);
    }

  } catch (error) {
    console.error('Error uploading keys:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

uploadKeys();