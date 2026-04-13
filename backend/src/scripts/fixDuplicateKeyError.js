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

async function fixDuplicateKeyError() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const db = mongoose.connection.db;

    // Drop all indexes on the users collection to reset
    try {
      await db.collection("users").dropIndexes();
      console.log("✅ Dropped all indexes on users collection");
    } catch (error) {
      console.log("ℹ️ Could not drop indexes:", error.message);
    }

    // Recreate the indexes with the correct sparse setting
    try {
      await db.collection("users").createIndex({ phone: 1 }, { unique: true });
      console.log("✅ Created unique index on phone");
    } catch (error) {
      console.error("Error creating phone index:", error.message);
    }

    try {
      await db.collection("users").createIndex({ userId: 1 }, { sparse: true });
      console.log("✅ Created sparse index on userId");
    } catch (error) {
      console.error("Error creating userId index:", error.message);
    }

    console.log("\n✅ Database fixed! You can now restart your application.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

fixDuplicateKeyError();
