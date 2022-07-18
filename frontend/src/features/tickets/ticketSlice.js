import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Create new ticket
export const createTicket = createAsyncThunk('tickets/createNewTicket', async (ticketData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.createTicket(ticketData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user tickets
export const getTickets = createAsyncThunk('tickets/getAllUserTickets', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.getTickets(token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get single ticket
export const getTicket = createAsyncThunk('tickets/getSingleTicket', async (ticketID, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.getTicket(ticketID, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Close ticket
export const closeTicket = createAsyncThunk('tickets/closeTicket', async (ticketID, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.closeTicket(ticketID, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        errorReset: (state) => {
            state.message = '';
        },
        ticketReset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
            state.ticket = {};
        },
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTickets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets = action.payload;
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ticket = action.payload;
            })
            .addCase(getTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(closeTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(closeTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ticket = action.payload;
                state.tickets = state.tickets.map((ticket) =>
                    ticket._id === action.payload._id ? action.payload : ticket
                );
            })
            .addCase(closeTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, errorReset, ticketReset } = ticketSlice.actions;
export default ticketSlice.reducer;
