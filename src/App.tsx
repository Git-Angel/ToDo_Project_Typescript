import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDo from "./Pages/ToDo";
import TodoDetail from "./Pages/TodoDetail";
import NotFound from "./Pages/NotFound";
import TestError from "./Pages/TestError";
import Login from "./Pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Skeleton from "./components/Skeleton";

function AppRoutes() {
  const { loadingAfterLogin } = useAuth();

  if (loadingAfterLogin) {
    return <Skeleton />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ToDo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/todos/:id"
        element={
          <ProtectedRoute>
            <TodoDetail />
          </ProtectedRoute>
        }
      />
      <Route path="/test-error" element={<TestError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
    );
}
