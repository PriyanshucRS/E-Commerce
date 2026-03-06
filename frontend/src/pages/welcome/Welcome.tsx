import { useState, useEffect } from "react";

export const WelcomeSlide = ({ userName }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-20 right-5 z-[100] animate-bounce">
      <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 border-b-4 border-green-800">
        <span className="text-xl">👋</span>
        <div>
          <p className="font-bold text-sm">Welcome Back!</p>
          <p className="text-xs opacity-90">Login Successful</p>
        </div>
      </div>
    </div>
  );
};
