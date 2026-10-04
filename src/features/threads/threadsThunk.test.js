import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';

import { createThread as createThreadApi, getThreads, upVoteThread as upVoteThreadApi } from './threadsApi';

import { createThread, fetchThreads, upVoteThread } from './threadsSlice';

vi.mock('./threadsApi', () => ({
  getThreads: vi.fn(),
  getThreadById: vi.fn(),
  createThread: vi.fn(),
  upVoteThread: vi.fn(),
  downVoteThread: vi.fn(),
  neutralVoteThread: vi.fn(),
}));

describe('threadsSlice thunk functions', () => {
  /*
   * Test scenarios:
   * 1. fetchThreads harus mengembalikan daftar thread ketika API berhasil.
   * 2. fetchThreads harus mengembalikan pesan error ketika API gagal.
   * 3. createThread harus mengembalikan thread baru ketika API berhasil.
   * 4. upVoteThread harus mengembalikan data vote ketika API berhasil.
   */

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return threads when fetchThreads succeeds', async () => {
    const threads = [
      {
        id: 'thread-1',
        title: 'Pendakian Rinjani',
      },
    ];

    getThreads.mockResolvedValue({
      data: {
        data: {
          threads,
        },
      },
    });

    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await fetchThreads()(dispatch, getState, undefined);

    expect(getThreads).toHaveBeenCalledTimes(1);
    expect(result.type).toBe('threads/fetchThreads/fulfilled');
    expect(result.payload).toEqual(threads);
  });

  it('should return an error message when fetchThreads fails', async () => {
    getThreads.mockRejectedValue({
      response: {
        data: {
          message: 'Failed to fetch threads',
        },
      },
    });

    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await fetchThreads()(dispatch, getState, undefined);

    expect(getThreads).toHaveBeenCalledTimes(1);
    expect(result.type).toBe('threads/fetchThreads/rejected');
    expect(result.payload).toBe('Failed to fetch threads');
  });

  it('should return the created thread when createThread succeeds', async () => {
    const threadData = {
      title: 'Persiapan Pendakian',
      body: 'Apa saja yang perlu dipersiapkan?',
      category: 'tips',
    };

    const createdThread = {
      id: 'thread-2',
      ...threadData,
    };

    createThreadApi.mockResolvedValue({
      data: {
        data: {
          thread: createdThread,
        },
      },
    });

    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await createThread()(dispatch, getState, undefined);

    expect(createThreadApi).toHaveBeenCalledTimes(1);
    expect(result.type).toBe('threads/createThread/fulfilled');
    expect(result.payload).toEqual(createdThread);
  });

  it('should return vote data when upVoteThread succeeds', async () => {
    const threadId = 'thread-1';

    const vote = {
      threadId,
      userId: 'user-1',
      voteType: 1,
    };

    upVoteThreadApi.mockResolvedValue({
      data: {
        data: {
          vote,
        },
      },
    });

    const dispatch = vi.fn();
    const getState = vi.fn();

    const result = await upVoteThread()(dispatch, getState, undefined);

    expect(upVoteThreadApi).toHaveBeenCalledTimes(1);
    expect(result.type).toBe('threads/upVoteThread/fulfilled');
    expect(result.payload).toEqual(vote);
  });
});
