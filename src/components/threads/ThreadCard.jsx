import { Link } from "react-router-dom";

import ThreadVoteActions from "./ThreadVoteActions";

function ThreadCard({ thread }) {
  const formattedDate = new Date(thread.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const excerpt = thread.body ? thread.body.replace(/<[^>]*>/g, "").slice(0, 140) : "";

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700">
      <Link to={`/threads/${thread.id}`} className="block">
        <div className="mb-3 flex items-center justify-between gap-4">
          {thread.category && <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">#{thread.category}</span>}

          <time dateTime={thread.createdAt} className="text-xs text-zinc-500">
            {formattedDate}
          </time>
        </div>

        <h2 className="text-lg font-semibold text-white">{thread.title}</h2>

        {excerpt && (
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {excerpt}
            {thread.body.length > 140 && "..."}
          </p>
        )}
      </Link>

      <ThreadVoteActions thread={thread} />
    </article>
  );
}

export default ThreadCard;
