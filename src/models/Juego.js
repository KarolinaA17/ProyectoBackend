const mongoose = require("mongoose");

const JuegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  genero: { type: String, required: true },
  plataforma: { type: String, required: true },
  añoLanzamiento: { type: Number, required: true },
  desarrollador: { type: String, required: true },
  imagenPortada: { type: String },
  descripcion: { type: String },
  completado: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Juego", JuegoSchema);
