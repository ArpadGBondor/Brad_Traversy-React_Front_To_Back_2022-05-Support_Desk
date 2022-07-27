import api from '../api';

const API_URL = '/tickets';

// Create new ticket
const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await api.post(API_URL, ticketData, config);
    return response.data;
};

// Get user tickets
const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await api.get(API_URL, config);
    return response.data;
};

// Get single ticket
const getTicket = async (ticketID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await api.get(`${API_URL}/${ticketID}`, config);
    return response.data;
};

// Close ticket
const closeTicket = async (ticketID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await api.put(`${API_URL}/${ticketID}`, { status: 'closed' }, config);
    return response.data;
};

const ticketService = {
    createTicket,
    getTickets,
    getTicket,
    closeTicket,
};

export default ticketService;
