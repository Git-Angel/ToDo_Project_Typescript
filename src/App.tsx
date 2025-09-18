import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import ToDo from "./Pages/ToDo";
import TodoDetail from "./Pages/TodoDetail";
import NotFound from "./Pages/NotFound";
import TestError from "./Pages/TestError";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorFallback from "./components/ErrorFallback";
import Skeleton from "./components/Skeleton";

export default function App() {
  // show skeleton at first, remove after 10 seconds to render page content
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showSkeleton ? (
        <Skeleton />
      ) : (
        <div>
          <BrowserRouter>
            <div>
              <ErrorBoundary fallback={<ErrorFallback />}>
                <Routes>
                  <Route path="/" element={<ToDo />} />
                  <Route path="/todos/:id" element={<TodoDetail />} />
                  <Route path="/test-error" element={<TestError />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ErrorBoundary>
            </div>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}
