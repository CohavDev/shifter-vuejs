import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { date, selection, userName } = req.body;
  if (!date || !selection || !userName) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    console.log("env var = ", process.env.MONGODB_URI);
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db("store");
    const collection = db.collection("shifts");
    const result = await collection.insertOne({ date, selection, userName });
    res
      .status(200)
      .json({ message: "Data submitted succesfully", id: result.insertedId });
  } catch (err) {
    console.error("error connecting to mongoDB", err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) await client.close();
  }
}
