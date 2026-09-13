import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "../../features/auth/authSlice";
import LoadingSpinner from "../common/LoadingSpinner";

function SessionLoader({ children }) {
  const dispatch = useDispatch();

  const { token, sessionStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && sessionStatus === "idle") {
      dispatch(restoreSession());
    }
  }, [dispatch, token, sessionStatus]);

  if (token && sessionStatus === "loading") {
    return <LoadingSpinner label="Memulihkan sesi" fullScreen />;
  }

  return children;
}

export default SessionLoader;
