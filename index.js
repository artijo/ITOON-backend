const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

require('dotenv').config();

// Middleware for JSON parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', routes);


// Start the server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

