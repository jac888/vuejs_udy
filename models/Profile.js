const mongoose = require("mongoose");
//set this to avoid warning msg
mongoose.set("useFindAndModify", false);
const Schema = mongoose.Schema;
const profileSchema = new Schema({
  type: {
    type: String
  },
  desc: {
    type: String
  },
  income: {
    type: String,
    required: true
  },
  expense: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Profile = mongoose.model("profiles", profileSchema);
