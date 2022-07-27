import api from '../api';
import { createAuthConfig } from '../../utils';

const API_URL = '/tickets';

// Create new ticket
const createTicket = async (ticketData, token) => {
    const response = await api.post(API_URL, ticketData, createAuthConfig(token));
    return response.data;
};

// Get user tickets
const getTickets = async (token) => {
    const response = await api.get(API_URL, createAuthConfig(token));
    return response.data;
};

// Get single ticket
const getTicket = async (ticketID, token) => {
    const response = await api.get(`${API_URL}/${ticketID}`, createAuthConfig(token));
    return response.data;
};

// Close ticket
const closeTicket = async (ticketID, token) => {
    const response = await api.put(
        `${API_URL}/${ticketID}`,
        { status: 'closed' },
        createAuthConfig(token)
    );
    return response.data;
};

const ticketService = {
    createTicket,
    getTickets,
    getTicket,
    closeTicket,
};

export default ticketService;
