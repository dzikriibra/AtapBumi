import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createThread as createThreadApi, getThreadById, getThreads } from "./threadsApi";

const initialState = {
  threads: [],
  status: "idle",
  error: null,

  selectedThread: null,
  detailStatus: "idle",
  detailError: null,

  createStatus: "idle",
  createError: null,
};

export const fetchThreads = createAsyncThunk("threads/fetchThreads", async (_, { rejectWithValue }) => {
  try {
    const response = await getThreads();

    await new Promise((resolve) => setTimeout(resolve, 1000));

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

export const createThread = createAsyncThunk("threads/createThread", async (threadData, { rejectWithValue }) => {
  try {
    const response = await createThreadApi(threadData);

    return response.data.data.thread;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to create thread");
  }
});

const threadsSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    addCommentToSelectedThread: (state, action) => {
      if (!state.selectedThread) {
        return;
      }

      state.selectedThread.comments.push(action.payload);
      state.selectedThread.totalComments += 1;
    },
  },
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
      })
      .addCase(createThread.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.threads.unshift(action.payload);
      })
      .addCase(createThread.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      });
  },
});

export const { addCommentToSelectedThread } = threadsSlice.actions;

export default threadsSlice.reducer;
