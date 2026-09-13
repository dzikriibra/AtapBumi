// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchThreads } from "../../features/threads/threadsSlice";
// import ThreadList from "./ThreadList";

// function ThreadLoader() {
//   const dispatch = useDispatch();

//   const { threads, status, error } = useSelector((state) => state.threads);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchThreads());
//     }
//   }, [dispatch, status]);

//   if (status === "loading") {
//     return <p>Loading threads...</p>;
//   }

//   if (status === "failed") {
//     return <p>{error}</p>;
//   }

//   return <ThreadList threads={threads} />;
// }

// export default ThreadLoader;

import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchThreads } from "../../features/threads/threadsSlice";

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
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <LoaderCircle size={32} strokeWidth={2} className="animate-spin text-amber-500" aria-label="Memuat thread" />
      </div>
    );
  }

  if (status === "failed") {
    return <p>{error}</p>;
  }

  return <ThreadList threads={threads} />;
}

export default ThreadLoader;
