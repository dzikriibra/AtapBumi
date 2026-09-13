import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchThreads } from "../../features/threads/threadsSlice";
import LoadingSpinner from "../common/LoadingSpinner";
import ThreadList from "./ThreadList";

function ThreadLoader() {
  const dispatch = useDispatch();

  const { threads, status, error } = useSelector((state) => state.threads);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchThreads());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <LoadingSpinner label="Memuat thread" />;
  }

  if (status === "failed") {
    return <p>{error}</p>;
  }

  return <ThreadList threads={threads} />;
}

export default ThreadLoader;
