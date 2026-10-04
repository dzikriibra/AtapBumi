import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import CommentForm from './CommentForm';

import { createComment } from '../../features/comments/commentsSlice';
import { addCommentToSelectedThread } from '../../features/threads/threadsSlice';

const mockDispatch = vi.fn();

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector) => selector({
    comments: {
      createStatus: 'idle',
      createError: null,
    },
  }),
}));

vi.mock('../../features/comments/commentsSlice', () => {
  const mockCreateComment = vi.fn((payload) => ({
    type: 'comments/createComment',
    payload,
  }));

  mockCreateComment.fulfilled = {
    match: (action) => action?.type === 'comments/createComment/fulfilled',
  };

  return {
    createComment: mockCreateComment,
  };
});

vi.mock('../../features/threads/threadsSlice', () => ({
  addCommentToSelectedThread: vi.fn((payload) => ({
    type: 'threads/addCommentToSelectedThread',
    payload,
  })),
}));

describe('CommentForm component', () => {
  /*
   * Test scenarios:
   * 1. CommentForm harus menampilkan textarea dan tombol submit.
   *
   * 2. User harus dapat mengetik isi komentar ke dalam textarea.
   *
   * 3. Submit form harus dispatch createComment dengan threadId
   *    dan content yang sesuai.
   *
   * 4. Setelah createComment berhasil, isi textarea harus dikosongkan
   *    dan komentar baru harus ditambahkan ke selected thread.
   */

  beforeEach(() => {
    vi.clearAllMocks();

    mockDispatch.mockResolvedValue({
      type: 'comments/createComment/pending',
    });
  });

  it('should render comment textarea and submit button', () => {
    render(<CommentForm threadId="thread-1" />);

    expect(
      screen.getByRole('textbox', {
        name: 'Tulis komentar',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Kirim Komentar',
      }),
    ).toBeInTheDocument();
  });

  it('should allow user to type a comment', () => {
    render(<CommentForm threadId="thread-1" />);

    const textarea = screen.getByRole('textbox', {
      name: 'Tulis komentar',
    });

    fireEvent.change(textarea, {
      target: {
        value: 'Persiapkan fisik sebelum mendaki.',
      },
    });

    expect(textarea).toHaveValue('Persiapkan fisik sebelum mendaki.');
  });

  it('should dispatch createComment with threadId and content', () => {
    render(<CommentForm threadId="thread-1" />);

    const textarea = screen.getByRole('textbox', {
      name: 'Tulis komentar',
    });

    fireEvent.change(textarea, {
      target: {
        value: 'Persiapkan fisik sebelum mendaki.',
      },
    });

    fireEvent.submit(textarea.closest('form'));

    expect(createComment).toHaveBeenCalledWith({
      threadId: 'thread-1',
      content: 'Persiapkan fisik sebelum mendaki.',
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'comments/createComment',
        payload: {
          threadId: 'thread-1',
          content: 'Persiapkan fisik sebelum mendaki.',
        },
      }),
    );
  });

  it('should clear textarea and add comment after successful submission', async () => {
    const createdComment = {
      id: 'comment-1',
      content: 'Persiapkan fisik sebelum mendaki.',
    };

    mockDispatch.mockResolvedValueOnce({
      type: 'comments/createComment/fulfilled',
      payload: createdComment,
    });

    render(<CommentForm threadId="thread-1" />);

    const textarea = screen.getByRole('textbox', {
      name: 'Tulis komentar',
    });

    fireEvent.change(textarea, {
      target: {
        value: createdComment.content,
      },
    });

    fireEvent.submit(textarea.closest('form'));

    expect(createComment).toHaveBeenCalledWith({
      threadId: 'thread-1',
      content: createdComment.content,
    });

    await vi.waitFor(() => {
      expect(addCommentToSelectedThread).toHaveBeenCalledWith(createdComment);

      expect(textarea).toHaveValue('');
    });
  });
});
