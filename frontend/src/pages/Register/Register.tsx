import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerRequest, clearError } from "../../redux/Slices/authSlice";
import { useEffect, useState } from "react";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const { isRegistered, error } = useSelector((state: any) => state.auth);

  const handleInputClick = () => {
    if (error) {
      dispatch(clearError());
    }

    if (passwordError) {
      setPasswordError("");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters!");
      return;
    }

    setPasswordError("");

    const { confirmPassword, ...submitData } = formData;
    dispatch(registerRequest(submitData));
  };

  useEffect(() => {
    if (isRegistered) {
      alert("Registred successfully!");

      const timer = setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isRegistered, navigate]);

  return (
    <div className="h-screen overflow-y-auto flex items-center justify-center bg-gray-500 dark:bg-gray-950 px-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-red-500 font-bold text-center text-xl mb-6">
          Registration Page
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                placeholder="Enter your first name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                placeholder="Enter your last name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                required
                onChange={handleChange}
              />
            </div>
            <div>
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
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                required
                onChange={handleChange}
                onFocus={handleInputClick}
              />
            </div>
            <div>
              <PasswordInput
                id="password"
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                onFocus={handleInputClick}
              />
            </div>
            <div>
              <PasswordInput
                id="confirmPassword"
                label="Confirm Password"
                placeholder="Enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={handleInputClick}
              />
            </div>

            {passwordError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                {passwordError}
              </div>
            )}

            {formData.password && formData.confirmPassword && (
              <div
                className={`px-4 py-2 rounded text-sm font-medium ${
                  formData.password === formData.confirmPassword
                    ? "bg-green-100 border border-green-400 text-green-700"
                    : "bg-yellow-100 border border-yellow-400 text-yellow-700"
                }`}
              >
                {formData.password === formData.confirmPassword
                  ? "Passwords match!"
                  : "Passwords do not match"}
              </div>
            )}
          </div>
          <div>
            <button className="w-full bg-blue-600 dark:bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-md active:scale-95">
              Register
            </button>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm mb-4">
              {error}
            </div>
          )}
        </form>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Login
          </Link>
          <br />
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline text-sm"
          >
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};
