const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');
const cors = require('cors');

require('dotenv').config();
app.use(cors());
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/episode', express.static(path.join(__dirname, 'uploads/episode')));

// Middleware for JSON parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', routes);


// Start the server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

