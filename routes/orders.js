const express = require('express');
const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
    const { name, phone, lessonIds } = req.body;
    const db = req.app.locals.db; // Access the database from app.locals

    // Debugging: Log the incoming request data
    console.log('Received request to create order:', req.body);

    // Check if the database is available
    if (!db) {
        console.error('Database connection is not available');
        return res.status(500).send('Database connection is not available');
    }

    try {
        const order = {
            name,
            phone,
            lessonIds,
            createdAt: new Date(),
        };

        // Debugging: Log the order object to be inserted
        console.log('Creating order with data:', order);

        // Insert the new order into the 'orders' collection
        const result = await db.collection('orders').insertOne(order);

        // Debugging: Log the result of the insertion
        console.log('Order created successfully:', result);

        // Return the result as a JSON response
        res.json(result);
    } catch (err) {
        // Debugging: Log the error
        console.error('Error creating order:', err);

        // Send an error response
        res.status(500).send('Error creating order');
    }
});

router.get('/', async (req, res) => {
    console.log('Fetching all orders...');
    const db = req.app.locals.db; // Access db from app.locals
    if (!db) {
        console.error('Database connection is not available');
        return res.status(500).send('Database connection is not available');
    }

    try {
        const orders = await db.collection('orders').find({}).toArray();
        console.log('orders fetched:', orders);
        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).send('Error fetching orders');
    }
});
module.exports = router;
