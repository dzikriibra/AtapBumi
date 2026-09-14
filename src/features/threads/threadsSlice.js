import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createThread as createThreadApi, downVoteThread as downVoteThreadApi, getThreadById, getThreads, neutralVoteThread as neutralVoteThreadApi, upVoteThread as upVoteThreadApi } from "./threadsApi";

const initialState = {
  threads: [],
  status: "idle",
  error: null,

  selectedThread: null,
  detailStatus: "idle",
  detailError: null,

  createStatus: "idle",
  createError: null,

  voteStatus: "idle",
  voteError: null,
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

export const upVoteThread = createAsyncThunk("threads/upVoteThread", async (threadId, { rejectWithValue }) => {
  try {
    const response = await upVoteThreadApi(threadId);

    return response.data.data.vote;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to upvote thread");
  }
});

export const downVoteThread = createAsyncThunk("threads/downVoteThread", async (threadId, { rejectWithValue }) => {
  try {
    const response = await downVoteThreadApi(threadId);

    return response.data.data.vote;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to downvote thread");
  }
});

export const neutralVoteThread = createAsyncThunk("threads/neutralVoteThread", async (threadId, { rejectWithValue }) => {
  try {
    const response = await neutralVoteThreadApi(threadId);

    return response.data.data.vote;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to remove thread vote");
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

    updateThreadVote: (state, action) => {
      const vote = action.payload;

      if (!vote) {
        return;
      }

      const { threadId, userId, voteType } = vote;

      const updateVoteState = (thread) => {
        if (!thread) {
          return;
        }

        if (!thread.upVotesBy) {
          thread.upVotesBy = [];
        }

        if (!thread.downVotesBy) {
          thread.downVotesBy = [];
        }

        thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);

        thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);

        if (voteType === 1) {
          thread.upVotesBy.push(userId);
        }

        if (voteType === -1) {
          thread.downVotesBy.push(userId);
        }
      };

      const thread = state.threads.find((item) => item.id === threadId);

      updateVoteState(thread);

      if (state.selectedThread?.id === threadId) {
        updateVoteState(state.selectedThread);
      }
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
      })

      .addCase(upVoteThread.pending, (state) => {
        state.voteStatus = "loading";
        state.voteError = null;
      })
      .addCase(upVoteThread.fulfilled, (state) => {
        state.voteStatus = "succeeded";
      })
      .addCase(upVoteThread.rejected, (state, action) => {
        state.voteStatus = "failed";
        state.voteError = action.payload;
      })

      .addCase(downVoteThread.pending, (state) => {
        state.voteStatus = "loading";
        state.voteError = null;
      })
      .addCase(downVoteThread.fulfilled, (state) => {
        state.voteStatus = "succeeded";
      })
      .addCase(downVoteThread.rejected, (state, action) => {
        state.voteStatus = "failed";
        state.voteError = action.payload;
      })

      .addCase(neutralVoteThread.pending, (state) => {
        state.voteStatus = "loading";
        state.voteError = null;
      })
      .addCase(neutralVoteThread.fulfilled, (state) => {
        state.voteStatus = "succeeded";
      })
      .addCase(neutralVoteThread.rejected, (state, action) => {
        state.voteStatus = "failed";
        state.voteError = action.payload;
      });
  },
});

export const { addCommentToSelectedThread, updateThreadVote } = threadsSlice.actions;

export default threadsSlice.reducer;
