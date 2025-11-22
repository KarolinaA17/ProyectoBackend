const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: { type: String, required: true },
  coverUrl: { type: String, default: '' },
  description: { type: String, default: '' },
  hoursPlayed: { type: Number, default: 0 },
  status: { type: String, enum: ['Pendiente','En progreso','Completado'], default: 'Pendiente' },
  rating: { type: Number, default: 0 }, // avg rating
  reviewsCount: { type: Number, default: 0 },
  genres: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', GameSchema);
