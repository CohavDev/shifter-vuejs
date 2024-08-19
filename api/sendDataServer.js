import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI =
  "mongodb+srv://shaulc:admin1234@cluster0.ywdnz4v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/api/sendData", async (req, res) => {
  console.log(req.body);
  const { date, selection, userName } = req.body;
  var client;
  if (!date || !selection || !userName) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    console.log("env var = ", MONGODB_URI);
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db("store");
    const collection = db.collection("shifts");
    // check if date already exist in db
    const searchedResult = await collection.findOne({ date, userName });
    if (searchedResult) {
      const result = await collection.updateOne(
        { _id: searchedResult._id },
        { $set: { date, selection, userName } }
      );
      res
        .status(200)
        .json({ message: "Data updated succesfully", id: result.upsertedId });
    } else {
      const result = await collection.insertOne({ date, selection, userName });
      res
        .status(200)
        .json({ message: "Data submitted succesfully", id: result.insertedId });
    }
  } catch (err) {
    console.error("error connecting to mongoDB", err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) await client.close();
  }
});
app.post("/api/getData", async (req, res) => {
  const { date, userName } = req.body;
  var client;
  if (!date || !userName) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    console.log("env var = ", MONGODB_URI);
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db("store");
    const collection = db.collection("shifts");
    const result = await collection.findOne({ date, userName });
    res.status(200).json({
      message: "Data retrieved succesfully",
      id: result.insertedId,
      selection: result.selection,
    });
  } catch (err) {
    console.error("error connecting to mongoDB", err);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (client) await client.close();
  }
});
