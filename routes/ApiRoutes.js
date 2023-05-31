const express = require('express');
const router = express.Router();
const quizController = require('../controllers/QuizControllers');

// Login route
router.post('/start', quizController.start);


module.exports = router;