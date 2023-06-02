const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
// const allCodes = mongoose.Schema({
//   nameOfthecode: String,
//   dateCreate: {
//     type: Date,
//     default: Date.now(),
//   },
//   code: String,
//   authorName: String,
//   markDown: String,
//   author: ObjectId,
// });

const allCodes = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  code: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "docModel",
  },
  upvotes: Number,
  downvotes: Number,

  likedIds: [mongoose.Schema.Types.ObjectId],
  dislikedIds: [mongoose.Schema.Types.ObjectId],
  docModel: {
    type: String,
    required: true,
    enum: [
      "python",
      "java",
      "cpp",
      "csharp",
      "golang",
      "kotlin",
      "objectivec",
      "php",
      "rust",
      "sql",
      "swift",
    ],
  },
});

module.exports = mongoose.model("allCodes", allCodes);
