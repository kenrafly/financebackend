import mongoose from "mongoose";

const walletRecordSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

//this will create the db title in the mongodb
const walletRecord = mongoose.model("walletRecord", walletRecordSchema);
export default walletRecord;
