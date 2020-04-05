var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// https://ipapi.co/
var LocationTrackingSchema = new Schema(
  {
    ip: { type: String, required: true },
    host: { type: String },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    nearestpatient: { type: Number, default: 0 },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updateAt",
    },
  }
);
module.exports = mongoose.model("UserLocation", LocationTrackingSchema);
