const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// pulling the other files in this folder and setting them to base routes
// /api/thoughts
router.use('/thoughts', thoughtRoutes);
// /api/users
router.use('/users', userRoutes);

module.exports = router;