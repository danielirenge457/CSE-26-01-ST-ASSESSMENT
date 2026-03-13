const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function connectMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("myDatabase");
    return db;

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

module.exports = connectMongoDB;