const express = require('express');
const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000; // Use PORT environment variable or default to 5000

// Middleware to parse JSON bodies
app.use(express.json());

// Use the routes defined in ./routes/index.js
app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
