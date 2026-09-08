import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchThreadDetail } from "../features/threads/threadsSlice";

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
    <main>
      <h1>{selectedThread.title}</h1>

      <p>{selectedThread.body}</p>

      <p>#{selectedThread.category}</p>

      <p>{selectedThread.owner.name}</p>

      <p>{selectedThread.comments.length} komentar</p>
    </main>
  );
}

export default ThreadDetailPage;
