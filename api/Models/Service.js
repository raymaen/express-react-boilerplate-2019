const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  description: {
    type: String
  },
  example: {
    type: String
  },
  sections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section"
    }
  ]
});

module.exports = Service = mongoose.model("Service", ServiceSchema);
