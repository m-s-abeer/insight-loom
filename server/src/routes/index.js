const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, InsightLoom!');
});

// Add more routes as needed

module.exports = router;
