import { describe, expect, it } from "vitest";

import { addCommentToSelectedThread, createThread, fetchThreads, updateThreadVote } from "./threadsSlice";
import threadsReducer from "./threadsSlice";

describe("threadsSlice reducer", () => {
  /*
   * Test scenario:
   * 1. fetchThreads.fulfilled harus mengubah status menjadi succeeded
   *    dan menyimpan daftar thread dari payload.
   *
   * 2. createThread.fulfilled harus mengubah status menjadi succeeded
   *    dan menambahkan thread baru ke posisi paling awal.
   *
   * 3. addCommentToSelectedThread harus menambahkan komentar baru
   *    dan meningkatkan totalComments sebanyak satu.
   *
   * 4. updateThreadVote harus memperbarui vote thread pada daftar threads
   *    dan selectedThread secara sinkron.
   */

  it("should store fetched threads when fetchThreads is fulfilled", () => {
    const initialState = {
      threads: [],
      status: "loading",
      error: null,
      selectedThread: null,
      detailStatus: "idle",
      detailError: null,
      createStatus: "idle",
      createError: null,
      voteStatus: "idle",
      voteError: null,
    };

    const threads = [
      {
        id: "thread-1",
        title: "Pendakian Rinjani",
      },
      {
        id: "thread-2",
        title: "Persiapan naik Semeru",
      },
    ];

    const action = fetchThreads.fulfilled(threads, "request-1");

    const nextState = threadsReducer(initialState, action);

    expect(nextState.status).toBe("succeeded");
    expect(nextState.threads).toEqual(threads);
  });

  it("should add newly created thread to the beginning of the list", () => {
    const existingThread = {
      id: "thread-1",
      title: "Pendakian Rinjani",
    };

    const newThread = {
      id: "thread-2",
      title: "Persiapan naik Semeru",
    };

    const initialState = {
      threads: [existingThread],
      status: "succeeded",
      error: null,
      selectedThread: null,
      detailStatus: "idle",
      detailError: null,
      createStatus: "loading",
      createError: null,
      voteStatus: "idle",
      voteError: null,
    };

    const action = createThread.fulfilled(newThread, "request-2");

    const nextState = threadsReducer(initialState, action);

    expect(nextState.createStatus).toBe("succeeded");
    expect(nextState.threads).toEqual([newThread, existingThread]);
  });

  it("should add a comment and increase totalComments", () => {
    const initialState = {
      threads: [],
      status: "idle",
      error: null,
      selectedThread: {
        id: "thread-1",
        title: "Pendakian Rinjani",
        comments: [],
        totalComments: 0,
      },
      detailStatus: "succeeded",
      detailError: null,
      createStatus: "idle",
      createError: null,
      voteStatus: "idle",
      voteError: null,
    };

    const comment = {
      id: "comment-1",
      content: "Persiapkan fisik sebelum mendaki.",
    };

    const action = addCommentToSelectedThread(comment);

    const nextState = threadsReducer(initialState, action);

    expect(nextState.selectedThread.comments).toEqual([comment]);
    expect(nextState.selectedThread.totalComments).toBe(1);
  });

  it("should update vote state on both thread list and selected thread", () => {
    const initialState = {
      threads: [
        {
          id: "thread-1",
          title: "Pendakian Rinjani",
          upVotesBy: ["user-1"],
          downVotesBy: ["user-2"],
        },
      ],
      status: "succeeded",
      error: null,
      selectedThread: {
        id: "thread-1",
        title: "Pendakian Rinjani",
        upVotesBy: ["user-1"],
        downVotesBy: ["user-2"],
      },
      detailStatus: "succeeded",
      detailError: null,
      createStatus: "idle",
      createError: null,
      voteStatus: "idle",
      voteError: null,
    };

    const action = updateThreadVote({
      threadId: "thread-1",
      userId: "user-2",
      voteType: 1,
    });

    const nextState = threadsReducer(initialState, action);

    expect(nextState.threads[0].upVotesBy).toEqual(["user-1", "user-2"]);
    expect(nextState.threads[0].downVotesBy).toEqual([]);
    expect(nextState.selectedThread.upVotesBy).toEqual(["user-1", "user-2"]);
    expect(nextState.selectedThread.downVotesBy).toEqual([]);
  });
});
