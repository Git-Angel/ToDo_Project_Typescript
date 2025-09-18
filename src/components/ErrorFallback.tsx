import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ErrorFallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer); // Cleanup
  }, [navigate]);

  {
    /*Redirect to content page after 5 seconds*/
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-4">
      <h1 className="text-2xl font-bold mb-2 text-red-600">
        Something went wrong.
      </h1>
      <p className="text-gray-700 mb-4">
        You will be redirected to the homepage in 5 seconds.
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700  cursor-pointer"
        >
          Go to Home
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600  cursor-pointer"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
