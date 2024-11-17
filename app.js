// app.js
const express = require('express');
const { MongoClient } = require('mongodb');
const lessonsRouter = require('./routes/lessons');
const ordersRouter = require('./routes/orders');
const app = express();
app.use(express.json());

const uri = "mongodb://localhost:27017/HZ-DB"; 
const client = new MongoClient(uri);

async function connectDB() {
    try {
        // Wait for MongoDB connection
        await client.connect();
        console.log('Connected to MongoDB');
        
        // Once connected, store the db object correctly
        const db = client.db('HZ-DB'); // Use correct database name
        app.locals.db = db;  // Store the db in app.locals to make it accessible across routes
        
        // Debugging: Confirm the database object is available
        console.log('Database object:', app.locals.db);

        // Start the server after the database is connected
        app.listen(3000, () => console.log('Server running on port 3000'));

        // Routes
        app.use('/lessons', lessonsRouter);
        app.use('/orders', ordersRouter);
        
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

// Initialize the database connection
connectDB();

// staticFile.js
const staticFile = require('./middleware/staticFile');
app.use('/images', staticFile);

// logger.js
const logger = require('./middleware/logger');
app.use(logger);

module.exports = app;  // Export the app for testing or other purposes
