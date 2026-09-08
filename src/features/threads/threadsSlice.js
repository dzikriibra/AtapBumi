import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getThreadById, getThreads } from "./threadsApi";

const initialState = {
  threads: [],
  status: "idle",
  error: null,
  selectedThread: null,
  detailStatus: "idle",
  detailError: null,
};

export const fetchThreads = createAsyncThunk("threads/fetchThreads", async (_, { rejectWithValue }) => {
  try {
    const response = await getThreads();

    return response.data.data.threads;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch threads");
  }
});

export const fetchThreadDetail = createAsyncThunk("threads/fetchThreadDetail", async (threadId, { rejectWithValue }) => {
  try {
    const response = await getThreadById(threadId);

    return response.data.data.detailThread;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch thread detail");
  }
});

const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.threads = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchThreadDetail.pending, (state) => {
        state.detailStatus = "loading";
        state.detailError = null;
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedThread = action.payload;
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.detailError = action.payload;
      });
  },
});

export default threadsSlice.reducer;
