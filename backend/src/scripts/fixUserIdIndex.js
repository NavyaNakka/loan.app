import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.development
const envPath = `${__dirname}/../../.env.development`;
const envContent = fs.readFileSync(envPath, "utf8");
const envVars = {};
envContent.split("\n").forEach((line) => {
  if (line.includes("=")) {
    const [key, ...valueParts] = line.split("=");
    const trimmedKey = key.trim();
    const trimmedValue = valueParts.join("=").trim().replace(/^["']|["']$/g, "");
    if (trimmedKey && !trimmedKey.startsWith("#")) {
      envVars[trimmedKey] = trimmedValue;
    }
  }
});

const MONGO_URI = envVars.MONGO_URI;
console.log("MONGO_URI loaded:", MONGO_URI.substring(0, 50) + "...");

async function fixIndex() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const db = mongoose.connection.db;

    try {
      // Drop the old unique index
      await db.collection("userinfos").dropIndex("userId_1");
      console.log("✅ Dropped old userId_1 index");
    } catch (error) {
      if (error.message.includes("ns not found") || error.message.includes("index not found")) {
        console.log("ℹ️ Index not found (already dropped)");
      } else {
        console.error("Error dropping index:", error.message);
      }
    }

    // Drop ALL indexes except _id
    try {
      await db.collection("userinfos").dropIndexes();
      console.log("✅ Dropped all indexes");
    } catch (error) {
      console.log("ℹ️ Indexes already clean");
    }

    // Clear the collection to remove null entries
    const result = await db.collection("userinfos").deleteMany({ userId: null });
    console.log(`✅ Deleted ${result.deletedCount} documents with null userId`);
    
    await mongoose.connection.close();
    console.log("✅ Done! Restart your backend server now.");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

fixIndex();
