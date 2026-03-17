import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest, clearError } from "../../redux/Slices/authSlice";
import { type RootState } from "../../redux/store/store";
import { useCallback, useEffect } from "react";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";

import { type loginFormData, loginSchema } from "../auth.schema";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

export const Login = () => {
  const { user, error } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: loginFormData) => {
    dispatch(loginRequest(data));
  };

  const handleClearError = useCallback(() => {
    if (error) dispatch(clearError());
  }, [error, dispatch]);

  useEffect(() => {
    if (user) {
      console.log("user", user);
      const fullName =
        `${user?.user.firstName} ${user.user.lastName }`.trim() ||
        "User";

      toast.success(`Welcome ${fullName}!`);
      reset();
      navigate("/");
    }
  }, [user, navigate, reset]);

  return (
    <div className="h-screen overflow-y-auto flex items-center justify-center bg-gray-500 dark:bg-gray-950 px-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-red-500 font-bold text-center text-2xl mb-6">
          Login
        </h1>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
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
                placeholder="example@email.com"
                {...register("email")}
                onFocus={handleClearError}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <PasswordInput
                id="password"
                label="Password"
                placeholder="Enter your password"
                {...register("password")}
                onFocus={handleClearError}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <button className="w-full bg-blue-600 dark:bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-md active:scale-95">
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
          <Link
            to="/"
            className="block mt-2 text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};
