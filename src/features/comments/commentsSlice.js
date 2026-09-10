import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createComment as createCommentApi } from "./commentsApi";

const initialState = {
  createStatus: "idle",
  createError: null,
};

export const createComment = createAsyncThunk("comments/createComment", async ({ threadId, content }, { rejectWithValue }) => {
  try {
    const response = await createCommentApi(threadId, {
      content,
    });

    return response.data.data.comment;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to create comment");
  }
});

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.createStatus = "succeeded";
      })
      .addCase(createComment.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.payload;
      });
  },
});

export default commentsSlice.reducer;
