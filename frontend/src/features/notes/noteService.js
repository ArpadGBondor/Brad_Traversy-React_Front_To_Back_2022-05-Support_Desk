import api from '../api';
import { createAuthConfig } from '../../utils';

const API_URL = '/tickets';

// Get ticket notes
const getNotes = async (ticketId, token) => {
    const response = await api.get(`${API_URL}/${ticketId}/notes`, createAuthConfig(token));
    return response.data;
};

// Create ticket note
const createNote = async (noteText, ticketId, token) => {
    const response = await api.post(
        `${API_URL}/${ticketId}/notes`,
        { text: noteText },
        createAuthConfig(token)
    );
    return response.data;
};

const ticketService = {
    getNotes,
    createNote,
};

export default ticketService;
