const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Review = require('../models/Review');

// GET /api/games  - list + optional ?q= ?
router.get('/', async (req, res) => {
  const q = req.query.q || '';
  try {
    const games = await Game.find({ title: new RegExp(q, 'i') }).sort({ createdAt: -1 });
    res.json(games);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/games/:id
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    const reviews = await Review.find({ game: game._id }).sort({ createdAt: -1 });
    res.json({ ...game.toObject(), reviews });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/games
router.post('/', async (req, res) => {
  const { title, coverUrl, description, hoursPlayed, status, genres } = req.body;
  try {
    const newGame = new Game({ title, coverUrl, description, hoursPlayed, status, genres });
    await newGame.save();
    res.status(201).json(newGame);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// PUT /api/games/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// DELETE /api/games/:id (also delete reviews)
router.delete('/:id', async (req, res) => {
  try {
    await Review.deleteMany({ game: req.params.id });
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
