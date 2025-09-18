import { Link } from "react-router-dom";
// import four from "../assets/notfound.jpg"
import notFound from "../assets/notfound.jpg"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4">
      <img
        src={notFound}
        alt="404 Error"
        className="w-64 h-auto sm:w-80 md:w-96 lg:w-[500px] mb-6"
      />
      <div className="text-center">
        <p className="text-lg mb-6">Page Not Found</p>
        <Link
          to="/"
          className="text-blue-600 underline hover:text-blue-800 transition"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
