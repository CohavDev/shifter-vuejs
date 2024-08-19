import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
export default async function handler(req, res) {
  const { date } = req.body;
  if (!date) {
    return res.status(400).json({ message: "Missing required field" });
  }
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db("store");
    const collection = db.collection("shifts");
    const result = await collection.findOne({ date });
    res
      .status(200)
      .json({ message: "Data loaded succesfully", id: result.insertedId });
  } catch (err) {
    console.error("error connecting to mongoDB", err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) await client.close();
  }
}
