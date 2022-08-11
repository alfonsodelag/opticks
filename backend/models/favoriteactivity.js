const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteActivitySchema = new Schema({
  activity: { type: String, required: true },
  accessibility: { type: Number, required: true },
  participants: { type: Number, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model("FavoriteActivity", favoriteActivitySchema);
