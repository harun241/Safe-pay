import axiosSecure from '@/Hooks/AxiosSecure/AxiosSecure';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch subscrioption from your API
export const fetchTransactions = createAsyncThunk(
    'subscrioption/fetchTransactions',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosSecure.get("/api/subscrioption"); // ✅ only .get()
            return res.data; // ✅ Axios already parses JSON
        } catch (error) {
            // Properly extract error message
            const message = error.response?.data?.error || error.message || "Failed to fetch transactions";
            return rejectWithValue(message);
        }
    }
);


const subscriptionSlice = createSlice({
    name: 'subscrioption',
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



export default subscriptionSlice.reducer;
