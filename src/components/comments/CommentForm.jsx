import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../features/comments/commentsSlice";
import { addCommentToSelectedThread } from "../../features/threads/threadsSlice";

function CommentForm({ threadId }) {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const { createStatus, createError } = useSelector((state) => state.comments);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resultAction = await dispatch(
      createComment({
        threadId,
        content,
      }),
    );

    if (createComment.fulfilled.match(resultAction)) {
      dispatch(addCommentToSelectedThread(resultAction.payload));
      setContent("");
    }
  };

  const isSubmitting = createStatus === "loading";

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <label htmlFor="comment" className="mb-2 block text-sm font-medium text-zinc-300">
        Tulis komentar
      </label>

      <textarea
        id="comment"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        required
        rows="4"
        placeholder="Bagikan pendapatmu..."
        className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-zinc-600"
      />

      {createStatus === "failed" && <p className="mt-2 text-sm text-red-400">{createError}</p>}

      <button type="submit" disabled={isSubmitting} className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50">
        {isSubmitting ? "Mengirim..." : "Kirim Komentar"}
      </button>
    </form>
  );
}

export default CommentForm;
