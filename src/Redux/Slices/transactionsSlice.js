import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch transactions from your API
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async () => {
        const res = await fetch('/api/transactions');
        if (!res.ok) throw new Error('Failed to fetch transactions');
        return res.json();
    }
);

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        items: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default transactionsSlice.reducer;
