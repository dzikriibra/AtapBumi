import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchThreadDetail } from "../features/threads/threadsSlice";
import CommentList from "../components/comments/CommentList";
import CommentForm from "../components/comments/CommentForm";

function ThreadDetailPage() {
  const { threadId } = useParams();
  const dispatch = useDispatch();

  const { selectedThread, detailStatus, detailError } = useSelector((state) => state.threads);

  useEffect(() => {
    dispatch(fetchThreadDetail(threadId));
  }, [dispatch, threadId]);

  if (detailStatus === "loading") {
    return <p>Loading thread...</p>;
  }

  if (detailStatus === "failed") {
    return <p>{detailError}</p>;
  }

  if (!selectedThread) {
    return <p>Thread tidak ditemukan.</p>;
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <article>
          <p className="text-sm text-zinc-500">#{selectedThread.category}</p>

          <h1 className="mt-2 text-3xl font-bold text-white">{selectedThread.title}</h1>

          <p className="mt-4 text-base leading-7 text-zinc-300">{selectedThread.body}</p>

          <div className="mt-6 flex items-center gap-3">
            <img src={selectedThread.owner.avatar} alt={selectedThread.owner.name} className="h-10 w-10 rounded-full" />

            <div>
              <p className="text-sm font-medium text-white">{selectedThread.owner.name}</p>

              <time dateTime={selectedThread.createdAt} className="text-xs text-zinc-500">
                {new Date(selectedThread.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </time>
            </div>
          </div>
        </article>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">Komentar ({selectedThread.comments.length})</h2>

          <CommentForm threadId={threadId} />

          <div className="mt-4">
            <CommentList comments={selectedThread.comments} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default ThreadDetailPage;
