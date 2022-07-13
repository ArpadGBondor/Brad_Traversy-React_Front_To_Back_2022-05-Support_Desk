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

module.exports = router;
