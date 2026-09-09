function CommentCard({ comment }) {
  const formattedDate = new Date(comment.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="border-b border-zinc-800 py-4">
      <div className="flex items-center gap-3">
        <img src={comment.owner.avatar} alt={comment.owner.name} className="h-8 w-8 rounded-full" />

        <div>
          <p className="text-sm font-medium text-white">{comment.owner.name}</p>

          <time dateTime={comment.createdAt} className="text-xs text-zinc-500">
            {formattedDate}
          </time>
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-zinc-300">{comment.content}</p>
    </article>
  );
}

export default CommentCard;
