import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService';

const initialState = {
    notes: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

// Get notes for a ticket
export const getNotes = createAsyncThunk('notes/getNotes', async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await noteService.getNotes(ticketId, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Create ticket note
export const createNote = createAsyncThunk('notes/createNote', async (ticketId, noteData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await noteService.createNote(ticketId, noteData, token);
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        reset: (state) => initialState,
        errorReset: (state) => {
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes = action.payload;
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createNote.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNote.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, errorReset } = noteSlice.actions;
export default noteSlice.reducer;
