import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    let collection = await db.collection("fortunes");
    let results = await collection.aggregate([{$sample: {size: 5}}]);
    res.send(results).status(200);
  });


export default router;