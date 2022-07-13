const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
    // protect middleware already checked the database for the user
    const tickets = await Ticket.find({ user: req.user.id });
    res.status(200).json(tickets);
});

// @desc Create a ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body;

    // Validation
    if (!product || !description) {
        res.status(400);
        throw new Error('Please include all fields');
    }

    const newTicket = await Ticket.create({
        user: req.user.id,
        product,
        description,
    });

    res.status(201).json(newTicket);
});

// @desc Get a single ticket
// @route GET /api/tickets/:ticketID
// @access Private
const getSingleTicket = asyncHandler(async (req, res) => {
    const { ticketID } = req.params;
    const ticket = await Ticket.findById(ticketID);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorised');
    }

    res.status(200).json(ticket);
});

// @desc Update a ticket
// @route GET /api/tickets/:ticketID
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
    const { ticketID } = req.params;
    const { product, description } = req.body;

    // Validation
    if (!product || !description) {
        res.status(400);
        throw new Error('Please include all fields');
    }

    const ticket = await Ticket.findById(ticketID);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorised');
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(ticketID, { product, description }, { new: true });

    res.status(200).json(updatedTicket);
});

// @desc Delete a ticket
// @route GET /api/tickets/:ticketID
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
    const { ticketID } = req.params;
    const ticket = await Ticket.findById(ticketID);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorised');
    }

    await ticket.remove();

    res.status(200).json({ message: 'Ticket deleted' });
});

module.exports = {
    getTickets,
    createTicket,
    getSingleTicket,
    updateTicket,
    deleteTicket,
};
