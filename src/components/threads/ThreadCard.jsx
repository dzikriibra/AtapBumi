import { useSelector } from 'react-redux';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThreadVoteActions from './ThreadVoteActions';
import formatDate from '../../utils/formatDate';

function ThreadCard({ thread }) {
  const { users, status: usersStatus } = useSelector((state) => state.users);

  const owner = users.find((user) => user.id === thread.ownerId);

  const excerpt = thread.body
    ? thread.body.replace(/<[^>]*>/g, '').slice(0, 140)
    : '';

  let authorName = 'Penulis tidak ditemukan';

  if (usersStatus === 'loading' || usersStatus === 'idle') {
    authorName = 'Memuat penulis...';
  } else if (owner) {
    authorName = owner.name;
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700"
    >
      <Link to={`/threads/${thread.id}`} className="block">
        <div className="mb-3 flex items-center justify-between gap-4">
          {thread.category && (
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
              #{thread.category}
            </span>
          )}

          <time dateTime={thread.createdAt} className="text-xs text-zinc-500">
            {formatDate(thread.createdAt)}
          </time>
        </div>

        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-amber-400">
          <User size={14} aria-hidden="true" />
          <span>Oleh {authorName}</span>
        </p>

        <h2 className="text-lg font-semibold text-white">{thread.title}</h2>

        {excerpt && (
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {excerpt}
            {thread.body.length > 140 && '...'}
          </p>
        )}
      </Link>

      <ThreadVoteActions thread={thread} />
    </motion.article>
  );
}

export default ThreadCard;
