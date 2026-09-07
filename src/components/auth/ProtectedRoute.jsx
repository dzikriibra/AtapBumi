import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const { token, sessionStatus } = useSelector((state) => state.auth);

  if (sessionStatus === "loading") {
    return <p>Memeriksa sesi...</p>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
