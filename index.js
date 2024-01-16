const express = require('express');
const app = express();
const port = 3000;

// Define your API routes here
app.get('/api/compose', (req, res) => {
    // Handle GET request for Kotlin Jetpack Compose API
    res.send('Hello from Kotlin Jetpack Compose API!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
