import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="text-7xl font-extrabold text-blue-600 dark:text-blue-400">
          404
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Page Not Found
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          The page you are looking for does not exist or was moved.
        </p>
        <Link
          to="/"
          className="inline-flex mt-6 items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};
