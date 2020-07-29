const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    producer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
