const path = require('path');
const express = require('express');
require('colors');
require('dotenv').config();
const { errorHandler, invalidPathHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const app = express();

// Connect to database
connectDB();

// // Parse "application/json" incoming Request objects as a JSON Object
app.use(express.json());
// // Parse "application/x-www-form-urlencoded", can only parse incoming Request Object if strings or arrays
app.use(express.urlencoded({ extended: false }));
// combines the 2 above, can parse objects with nested objects, and generally any type
// app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (_, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'));
} else {
    app.get('/', (_, res) => {
        res.status(200).json({ message: 'Welcome to the Support Desk API' });
    });
}

app.use(errorHandler);
app.use(invalidPathHandler);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
