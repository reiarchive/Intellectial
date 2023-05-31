const express = require('express');
const router = express.Router();

// Login route
router.get('/', (req, res) => {
    return res.status(200).render('index.ejs');
});


module.exports = router;