const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');

// @desc Get notes for a ticket
// @route GET /api/tickets/:ticketID/notes/
// @access Private
const getNotes = asyncHandler(async (req, res) => {
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

    const notes = await Note.find({ ticket: ticketID });
    res.status(200).json(notes);
});

// @desc Create ticket note
// @route POST /api/tickets/:ticketID/notes/
// @access Private
const createNote = asyncHandler(async (req, res) => {
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

    const newNote = await Note.create({
        text: req.body.text,
        isStaff: false,
        user: req.user.id,
        ticket: ticketID,
    });

    console.log(newNote);
    res.status(201).json(newNote);
});

module.exports = {
    getNotes,
    createNote,
};
