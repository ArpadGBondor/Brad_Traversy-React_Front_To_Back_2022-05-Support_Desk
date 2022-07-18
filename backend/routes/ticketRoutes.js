const express = require('express');
const router = express.Router();
const {
    getTickets,
    createTicket,
    getSingleTicket,
    updateTicket,
    deleteTicket,
} = require('../controllers/ticketController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getTickets).post(protect, createTicket);
router.route('/:ticketID').get(protect, getSingleTicket).put(protect, updateTicket).delete(protect, deleteTicket);

// Re-route into note router
const noteRouter = require('./noteRoutes');
router.use('/:ticketID/notes', noteRouter);

module.exports = router;
