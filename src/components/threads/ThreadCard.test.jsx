import {
  describe, expect, it, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ThreadCard from './ThreadCard';

vi.mock('./ThreadVoteActions', () => ({
  default: () => <div data-testid="thread-vote-actions" />,
}));

describe('ThreadCard component', () => {
  /*
   * Test scenarios:
   * 1. ThreadCard harus menampilkan kategori dan judul thread.
   *
   * 2. ThreadCard harus memotong excerpt body menjadi maksimal 140 karakter
   *    ketika body melebihi batas.
   *
   * 3. Link thread harus mengarah ke halaman detail thread.
   *
   * 4. ThreadCard harus menampilkan tanggal thread melalui formatDate.
   *
   * 5. ThreadCard harus menampilkan nama author berdasarkan ownerId.
   */

  const thread = {
    id: 'thread-1',
    title: 'Persiapan Pendakian Rinjani',
    body: 'Persiapkan fisik dan perlengkapan dengan baik sebelum memulai pendakian Rinjani.',
    category: 'tips',
    createdAt: '2026-09-18T10:00:00.000Z',
    totalComments: 5,
    upVotesBy: [],
    downVotesBy: [],
  };

  const renderThreadCard = (threadData, users = []) => {
    const store = configureStore({
      reducer: {
        users: (
          state = {
            users,
            status: 'succeeded',
            error: null,
          },
        ) => state,
      },
    });

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <ThreadCard thread={threadData} />
        </MemoryRouter>
      </Provider>,
    );
  };

  it('should render thread category and title', () => {
    renderThreadCard(thread);

    expect(screen.getByText('#tips')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Persiapan Pendakian Rinjani',
      }),
    ).toBeInTheDocument();
  });

  it('should render truncated thread body excerpt when body exceeds 140 characters', () => {
    const longBody = 'Persiapkan fisik dan perlengkapan dengan baik sebelum memulai pendakian Rinjani. Pastikan semua kebutuhan seperti tenda, makanan, air, pakaian hangat, dan perlengkapan navigasi sudah tersedia sebelum berangkat.';

    const longThread = {
      ...thread,
      body: longBody,
    };

    renderThreadCard(longThread);

    const excerpt = longBody.slice(0, 140);

    expect(screen.getByText(`${excerpt}...`)).toBeInTheDocument();
    expect(excerpt).toHaveLength(140);
    expect(screen.queryByText(longBody)).not.toBeInTheDocument();
  });

  it('should link to the thread detail page', () => {
    renderThreadCard(thread);

    const threadLink = screen.getByRole('link', {
      name: /Persiapan Pendakian Rinjani/,
    });

    expect(threadLink).toHaveAttribute('href', '/threads/thread-1');
  });

  it('should render the formatted thread creation date', () => {
    renderThreadCard(thread);

    expect(screen.getByText('18 Sep 2026')).toBeInTheDocument();
  });

  it('should render the thread author name based on ownerId', () => {
    const users = [
      {
        id: 'user-1',
        name: 'Dzikri',
      },
      {
        id: 'user-2',
        name: 'JaGo',
      },
    ];

    const threadWithOwner = {
      ...thread,
      ownerId: 'user-2',
    };

    renderThreadCard(threadWithOwner, users);

    expect(screen.getByText('Oleh JaGo')).toBeInTheDocument();
  });
});
