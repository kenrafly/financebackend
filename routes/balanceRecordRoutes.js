import express from "express";
import balanceRecord from "../models/balanceSchema.js";

const balRouter = express.Router();
balRouter.get("/getAllByUserId/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const records = await balanceRecord.find({ userId });
    if (records.length === 0) {
      return res.status(404).send("No record found");
    }
    res.status(200).send(records);
  } catch (error) {
    res.status(500).send(error);
  }
});

balRouter.post("/", async (req, res) => {
  try {
    const record = new balanceRecord(req.body);
    const savedRecord = await record.save();
    res.status(200).send(savedRecord);
  } catch (error) {
    res.status(404).send(error);
  }
});

balRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newRecord = req.body;
    const record = await balanceRecord.findByIdAndUpdate(id, newRecord, {
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

balRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const record = await balanceRecord.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).send("Record not found");
    }
    res.status(200).send(record);
  } catch (error) {
    res.status(404).send(error);
  }
});

export default balRouter;
