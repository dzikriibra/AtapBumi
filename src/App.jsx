import { BrowserRouter, Route, Routes } from "react-router-dom";

import SessionLoader from "./components/auth/SessionLoader";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedTestPage from "./pages/ProtectedTestPage";

function App() {
  return (
    <BrowserRouter>
      <SessionLoader>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/protected-test" element={<ProtectedTestPage />} />
          </Route>
        </Routes>
      </SessionLoader>
    </BrowserRouter>
  );
}

export default App;
