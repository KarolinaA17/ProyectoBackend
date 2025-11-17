const mongoose = require("mongoose");

const ReseñaSchema = new mongoose.Schema({
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: "Juego", required: true },
  puntuacion: { type: Number, min: 1, max: 5, required: true },
  textoReseña: { type: String, required: true },
  horasJugadas: { type: Number, default: 0 },
  dificultad: { type: String, enum: ["Fácil", "Normal", "Difícil"], required: true },
  recomendaria: { type: Boolean, default: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reseña", ReseñaSchema);
