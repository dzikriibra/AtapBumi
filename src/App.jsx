import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./layout/AppLayout";

import SessionLoader from "./components/auth/SessionLoader";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ProtectedTestPage from "./pages/ProtectedTestPage";
import ThreadDetailPage from "./pages/ThreadDetailPage";
import CreateThreadPage from "./pages/CreateThreadPage";
import LeaderboardPage from "./pages/LeaderboardPage";

function App() {
  return (
    <BrowserRouter>
      <SessionLoader>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/threads/:threadId" element={<ThreadDetailPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/protected-test" element={<ProtectedTestPage />} />

              <Route path="/threads/create" element={<CreateThreadPage />} />
            </Route>
          </Routes>
        </AppLayout>
      </SessionLoader>
    </BrowserRouter>
  );
}

export default App;
