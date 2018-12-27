const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const apikeySchema = new Schema(
  {
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
    date: {
      type: Date,
      default: Date.now()
    }
  },
  { _id: false }
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
  { strict: true }
);

module.exports = User = mongoose.model("users", userSchema);
