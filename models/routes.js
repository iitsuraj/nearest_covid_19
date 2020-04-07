var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RoutesSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    path: { type: String, required: true },
    type: { type: String, required: true, uppercase: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updateAt",
    },
  }
);

module.exports = mongoose.model("Route", RoutesSchema);
