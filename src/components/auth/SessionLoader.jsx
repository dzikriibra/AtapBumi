import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { restoreSession } from "../../features/auth/authSlice";

function SessionLoader({ children }) {
  const dispatch = useDispatch();

  const { token, sessionStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && sessionStatus === "idle") {
      dispatch(restoreSession());
    }
  }, [dispatch, token, sessionStatus]);

  if (token && sessionStatus === "loading") {
    return <p>Memulihkan sesi...</p>;
  }

  return children;
}

export default SessionLoader;
