import api from '../api';

const API_URL = '/tickets';

// Get ticket notes
const getNotes = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await api.get(`${API_URL}/${ticketId}/notes`, config);
    return response.data;
};

// Create ticket note
const createNote = async (noteText, ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await api.post(`${API_URL}/${ticketId}/notes`, { text: noteText }, config);
    return response.data;
};

const ticketService = {
    getNotes,
    createNote,
};

export default ticketService;
