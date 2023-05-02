const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const cpp = mongoose.Schema({
  nameOfthecode: String,
  language: String,
  dateCreate: {
    type: Date,
    default: Date.now(),
  },
  code: String,
  markDown: String,
  author: ObjectId,
});

module.exports = mongoose.model("cpp", cpp);
