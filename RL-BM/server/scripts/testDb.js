import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ProductKey from '../models/ProductKey.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

console.log('=== MongoDB Connection Test ===\n');

// Check if URI exists
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is NOT set in .env file');
  console.log('\nCheck that your .env file exists at:', path.join(__dirname, '../../.env'));
  process.exit(1);
}

console.log('✓ MONGODB_URI found in .env');
console.log('  URI starts with:', MONGODB_URI.substring(0, 20) + '...\n');

const testConnection = async () => {
  try {
    // Test connection
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB successfully!\n');

    // Check for product keys
    const count = await ProductKey.countDocuments();
    console.log(`Total product keys in database: ${count}`);

    if (count === 0) {
      console.log('\n❌ No product keys found in database!');
      console.log('   You need to run: node server/scripts/importCsv.js');
    } else {
      // Show some keys
      const keys = await ProductKey.find().limit(5);
      console.log('\nSample keys:');
      keys.forEach(k => {
        console.log(`  - ${k.key} (used: ${k.used})`);
      });

      // Show stats
      const usedCount = await ProductKey.countDocuments({ used: true });
      console.log(`\nUsed: ${usedCount} / ${count}`);
    }

    await mongoose.connection.close();
    console.log('\n✓ Test complete');
  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);

    if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.log('\n   Check your internet connection or MongoDB URI');
    } else if (error.message.includes('authentication')) {
      console.log('\n   Check your MongoDB username/password in the URI');
    }

    process.exit(1);
  }
};

testConnection();
