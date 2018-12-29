const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const apikeySchema = new Schema(
  {
    exchange: {
      type: Number,
      required: true
    },
    apikey: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    apisecret: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    enabled: {
      type: Boolean,
      default: false
    },
    dateAdded: {
      type: Date,
      default: Date.now()
    }
  }
  //,{ _id: false }
);

module.exports = APIKeys = mongoose.model("apikeys", apikeySchema);
