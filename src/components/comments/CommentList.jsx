import CommentCard from "./CommentCard";

function CommentList({ comments }) {
  if (comments.length === 0) {
    return <p className="text-sm text-zinc-500">Belum ada komentar.</p>;
  }

  return (
    <section>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </section>
  );
}

export default CommentList;
