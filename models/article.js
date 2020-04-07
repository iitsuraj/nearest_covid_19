var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticelSchema = new Schema(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: String, index: true, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updateAt",
    },
  }
);

module.exports = mongoose.model("Article", ArticelSchema);
