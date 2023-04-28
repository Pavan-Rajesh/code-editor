const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const allCodes = mongoose.Schema({
  nameOfthecode: String,
  dateCreate: {
    type: Date,
    default: Date.now(),
  },
  code: String,
  authorName: String,
  markDown: String,
  author: ObjectId,
});

module.exports = mongoose.model("allCodes", allCodes);
