const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    default: "textbox"
  },
  example: {
    type: String
  },
  style: {
    type: String,
    default: "default"
  }
});

module.exports = Section = mongoose.model("Section", SectionSchema);
