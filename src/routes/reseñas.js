const express = require("express");
const router = express.Router();
const Reseña = require("../models/Reseña");

// GET todas las reseñas
router.get("/", async (req, res) => {
  const reseñas = await Reseña.find().sort({ fechaCreacion: -1 });
  res.json(reseñas);
});

// GET reseñas por juego
router.get("/juego/:juegoId", async (req, res) => {
  const reseñas = await Reseña.find({ juegoId: req.params.juegoId });
  res.json(reseñas);
});

// POST crear reseña
router.post("/", async (req, res) => {
  const reseña = new Reseña(req.body);
  await reseña.save();
  res.status(201).json(reseña);
});

// PUT actualizar reseña
router.put("/:id", async (req, res) => {
  const updated = await Reseña.findByIdAndUpdate(
    req.params.id,
    { ...req.body, fechaActualizacion: new Date() },
    { new: true }
  );
  res.json(updated);
});

// DELETE eliminar reseña
router.delete("/:id", async (req, res) => {
  await Reseña.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Reseña eliminada" });
});

module.exports = router;
