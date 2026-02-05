import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// 1. Setup Environment
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Define Schema (Must match the one in server.js)
const MasterCodeUsageSchema = new mongoose.Schema({
  casId: { type: String, required: true },
  usedAt: { type: Date, default: Date.now },
  productType: { type: String } 
}, { collection: 'master-code-uses' });

const MasterCodeUsage = mongoose.model('MasterCodeUsage', MasterCodeUsageSchema);

async function exportAndClear() {
  try {
    // 3. Connect to MongoDB
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is missing in .env file");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB...');

    // 4. Fetch Data
    const logs = await MasterCodeUsage.find({});

    if (logs.length === 0) {
        console.log('No master code usage logs found. Nothing to export.');
        return;
    }

    // 5. Convert to CSV Format
    const headers = ['CAS ID,Product Type,Time Used'];
    const rows = logs.map(log => {
        const time = new Date(log.usedAt).toLocaleString();
        // Handle potential commas in data by wrapping in quotes if needed
        return `${log.casId},${log.productType},"${time}"`;
    });
    const csvContent = headers.concat(rows).join('\n');

    // 6. Save to File (with timestamp)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `master_code_logs_${timestamp}.csv`;
    const outputPath = path.resolve(process.cwd(), filename);

    fs.writeFileSync(outputPath, csvContent);
    console.log(`Successfully exported ${logs.length} records to ${filename}`);

    // 7. Delete Data
    const deleteResult = await MasterCodeUsage.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} records from the database.`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
    process.exit();
  }
}

exportAndClear();