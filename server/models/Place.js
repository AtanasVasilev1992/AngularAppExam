const mongoose = require("mongoose");
const User = require("./User");

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: String,
    img: String,
    description: String,
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
