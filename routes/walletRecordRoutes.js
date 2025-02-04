import express from "express";
import walletRecord from "../models/walletSchema.js";

const walRouter = express.Router();
walRouter.get("/getAllByUserId/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const records = await walletRecord.find({ userId });
    if (records.length === 0) {
      return res.status(404).send("No record found");
    }
    res.status(200).send(records);
  } catch (error) {
    res.status(500).send(error);
  }
});

walRouter.post("/", async (req, res) => {
  try {
    const record = new walletRecord(req.body);
    const savedRecord = await record.save();
    res.status(200).send(savedRecord);
  } catch (error) {
    res.status(404).send(error);
  }
});

walRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newRecord = req.body;
    const record = await walletRecord.findByIdAndUpdate(id, newRecord, {
      new: true,
    });
    if (!record) {
      return res.status(404).send("Record not found");
    }
    res.status(200).send(record);
  } catch (error) {
    res.status(404).send(error);
  }
});

walRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const record = await walletRecord.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).send("Record not found");
    }
    res.status(200).send(record);
  } catch (error) {
    res.status(404).send(error);
  }
});

export default walRouter;
