import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/loan-app";

async function fixIndexes() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const db = mongoose.connection.db;
    
    // Fix users collection
    const usersCollection = db.collection("users");
    try {
      await usersCollection.dropIndex("email_1");
      console.log("✅ Dropped email_1 index from users collection");
    } catch (err) {
      if (err.message.includes("index not found")) {
        console.log("ℹ️  email_1 index not found in users collection");
      } else {
        throw err;
      }
    }

    // Create new sparse unique index on email (allows multiple nulls)
    await usersCollection.createIndex(
      { email: 1 },
      { unique: true, sparse: true }
    );
    console.log("✅ Created sparse unique index on email in users collection");

    // Fix userinfos collection - REMOVE phone unique constraint
    const userinfoCollection = db.collection("userinfos");
    try {
      await userinfoCollection.dropIndex("phone_1");
      console.log("✅ Dropped phone_1 index from userinfos collection");
    } catch (err) {
      if (err.message.includes("index not found")) {
        console.log("ℹ️  phone_1 index not found in userinfos collection");
      } else {
        throw err;
      }
    }

    // Drop userId unique index (not needed)
    try {
      await userinfoCollection.dropIndex("userId_1");
      console.log("✅ Dropped userId_1 index from userinfos collection");
    } catch (err) {
      if (err.message.includes("index not found")) {
        console.log("ℹ️  userId_1 index not found in userinfos collection");
      } else {
        throw err;
      }
    }

    console.log("\n✅ All database indexes fixed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error fixing indexes:", error.message);
    process.exit(1);
  }
}

fixIndexes();
