import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosSecure from "@/Hooks/AxiosSecure/AxiosSecure";

// 🔹 Async thunk to fetch all subscriptions
export const fetchAllSubscriptions = createAsyncThunk(
  "subscription/fetchAllSubscriptions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosSecure.get(`/api/subscriptions`);

      if (!res.data?.success) {
        throw new Error(res.data?.error || "No subscriptions found");
      }

      return res.data.subscriptions;
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch subscriptions";
      return rejectWithValue(message);
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    list: [], // ✅ now stores all subscriptions
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubscriptions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllSubscriptions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchAllSubscriptions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default subscriptionSlice.reducer;
