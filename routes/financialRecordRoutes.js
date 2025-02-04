import express from "express";
import FinancialRecord from "../models/financialRecordSchema.js";

const finRouter = express.Router();
finRouter.get("/getAllByUserId/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const records = await FinancialRecord.find({ userId });
    if (records.length === 0) {
      return res.status(404).send("No record found");
    }
    res.status(200).send(records);
  } catch (error) {
    res.status(500).send(error);
  }
});
finRouter.post("/", async (req, res) => {
  try {
    const record = new FinancialRecord(req.body);
    const savedRecord = await record.save();
    res.status(200).send(savedRecord);
  } catch (error) {
    res.status(404).send(error);
  }
});
finRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newRecord = req.body;
    const record = await FinancialRecord.findByIdAndUpdate(id, newRecord, {
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
finRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const record = await FinancialRecord.findByIdAndDelete(id);
    if (!record) {
      return res.status(404).send("Record not found");
    }
    res.status(200).send(record);
  } catch (error) {
    res.status(404).send(error);
  }
});

export default finRouter;
