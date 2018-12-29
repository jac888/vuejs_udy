const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const apikeySchema = new Schema(
  {
    exchange: {
      type: Number,
      required: true
    },
    apiKey: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    apiSecret: {
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
  },
  { collection: "APIKeys" }
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    identity: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now()
    },
    apikeys: [apikeySchema]
  },
  { collection: "Users" }
);

module.exports = User = mongoose.model("users", userSchema);
