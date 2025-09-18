import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDo from "./Pages/ToDo";
import TodoDetail from "./Pages/TodoDetail";
import NotFound from "./Pages/NotFound";
import TestError from "./Pages/TestError";
import Login from "./Pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AuthProvider>);
}