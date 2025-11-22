const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Game = require('../models/Game');

// GET /api/reviews?game=<id>
router.get('/', async (req, res) => {
  const gameId = req.query.game;
  try {
    const query = gameId ? { game: gameId } : {};
    const reviews = await Review.find(query).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/reviews
router.post('/', async (req, res) => {
  try {
    const { game: gameId, author, text, rating } = req.body;
    if (!gameId) return res.status(400).json({ error: 'game id required' });
    const review = new Review({ game: gameId, author, text, rating });
    await review.save();

    // update game stats: average rating and count
    const reviews = await Review.find({ game: gameId });
    const avg = reviews.reduce((s,r) => s + r.rating, 0) / reviews.length;
    await Game.findByIdAndUpdate(gameId, { rating: avg, reviewsCount: reviews.length });

    res.status(201).json(review);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// PUT /api/reviews/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });

    // recalc rating for game
    const reviews = await Review.find({ game: updated.game });
    const avg = reviews.reduce((s,r) => s + r.rating, 0) / reviews.length;
    await Game.findByIdAndUpdate(updated.game, { rating: avg, reviewsCount: reviews.length });

    res.json(updated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// DELETE /api/reviews/:id
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Not found' });

    // recalc rating for game
    const reviews = await Review.find({ game: review.game });
    const avg = reviews.length ? reviews.reduce((s,r) => s + r.rating, 0) / reviews.length : 0;
    await Game.findByIdAndUpdate(review.game, { rating: avg, reviewsCount: reviews.length });

    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
