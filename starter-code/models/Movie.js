const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  actor: Schema.ObjectId
});

const MovieModel = mongoose.model("Movie", movieSchema);
module.exports = MovieModel;
