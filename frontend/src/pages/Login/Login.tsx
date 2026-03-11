import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest , clearError } from "../../redux/Slices/authSlice";
import { type RootState } from "../../redux/store/store";
import { useState, useEffect } from "react";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { user , error} = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

   
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

    const handleInputFocus = () => {
    if (error) dispatch(clearError());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest(formData));
  };

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setFormData({ email: "", password: "" });
        navigate("/", { state: { showWelcome: true } });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  return (
    <div className="h-screen overflow-y-auto flex items-center justify-center bg-gray-500 dark:bg-gray-950 px-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-red-500 font-bold text-center text-2xl mb-6">Login Page</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
        
          <div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                placeholder="Enter your mail"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                required
                onChange={handleChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div>
              <PasswordInput
                id="password"
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                onFocus={handleInputFocus}
              />
            </div>
          </div>
          <div>
            <button
              className="w-full bg-blue-600 dark:bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-md active:scale-95"
            >
              Login
            </button>
          </div>
          
            {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm text-center mb-4">
          {error}
        </div>
      )}
        </form>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Register
          </Link>
          <br />
          <Link to="/" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};
