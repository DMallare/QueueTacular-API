const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    status: {
      type: String,
      enum: ['Removed', 'Complete', 'Serving', 'Waiting'],
      default: 'Waiting',
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    wait: Number,
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
