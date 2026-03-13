export const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full bg-white/80 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 shadow-sm"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-indigo-600 border-b-pink-600 border-l-transparent animate-spin shadow-[0_0_20px_rgba(29,78,216,0.35)]"></div>
        <div className="absolute inset-2 rounded-full border-2 border-t-orange-500 border-r-transparent border-b-blue-500 border-l-transparent animate-[spin_1.5s_linear_infinite_reverse] opacity-80"></div>
        <div className="absolute inset-[30px] bg-gradient-to-tr from-blue-700 to-purple-700 dark:from-blue-500 dark:to-purple-500 rounded-full animate-pulse shadow-lg"></div>
      </div>
    </div>
  );
};
