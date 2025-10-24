import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosSecure from "@/Hooks/AxiosSecure/AxiosSecure";

// 🔹 Async thunk to fetch the user's latest subscription
export const fetchSubscription = createAsyncThunk(
    "subscription/fetchSubscription",
    async (uid, { rejectWithValue }) => {
        try {
            if (!uid) throw new Error("User email is required");

            const res = await axiosSecure.get(`/api/subscriptions?user_id=${uid}`);

            // If backend returns error
            if (!res.data?.success) {
                throw new Error(res.data?.error || "No subscription found");
            }

            return res.data.subscription;
        } catch (error) {
            const message =
                error.response?.data?.error ||
                error.message ||
                "Failed to fetch subscription";
            return rejectWithValue(message);
        }
    }
);

// 🔹 Slice definition
const subscriptionSlice = createSlice({
    name: "subscription",
    initialState: {
        latest: null, // store latest subscription
        status: "idle", // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubscription.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchSubscription.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.latest = action.payload;
            })
            .addCase(fetchSubscription.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default subscriptionSlice.reducer;
