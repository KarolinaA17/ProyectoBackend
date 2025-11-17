const express = require("express");
const router = express.Router();
const Juego = require("../models/Juego");

// GET todos los juegos
router.get("/", async (req, res) => {
  const juegos = await Juego.find().sort({ fechaCreacion: -1 });
  res.json(juegos);
});

// GET juego por ID
router.get("/:id", async (req, res) => {
  const juego = await Juego.findById(req.params.id);
  res.json(juego);
});

// POST crear juego
router.post("/", async (req, res) => {
  try {
    const juego = new Juego(req.body);
    await juego.save();
    res.status(201).json(juego);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT actualizar juego
router.put("/:id", async (req, res) => {
  const updated = await Juego.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE eliminar juego
router.delete("/:id", async (req, res) => {
  await Juego.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Juego eliminado" });
});

module.exports = router;
