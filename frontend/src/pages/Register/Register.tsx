import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../redux/store/store";
import { Link, useNavigate } from "react-router-dom";
import { registerRequest, clearError } from "../../redux/Slices/authSlice";
import { useEffect, useCallback } from "react";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";

import { useForm } from "react-hook-form";
import { type RegisterFormData, registerSchema } from "../auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isRegistered, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)});

  const onSubmit = (data: RegisterFormData) => {
    console.log("=>>", data);

    const { confirmPassword: _unused, ...submitData } = data;
    dispatch(registerRequest(submitData));
  };

  useEffect(() => {
    if (isRegistered) {
      alert("Registered successfully!");
      reset();
      navigate("/login");
    }
  }, [isRegistered, navigate, reset]);

  const handleClearError = useCallback(() => {
    if (error) dispatch(clearError());
  }, [error, dispatch]);

  return (
    <div className="h-screen overflow-y-auto flex items-center justify-center bg-gray-500 dark:bg-gray-950 px-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-red-500 font-bold text-center text-xl mb-6">
          Registration
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
                placeholder="Enter your first name"
                {...register("firstName")}
                onFocus={handleClearError}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                // required
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
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
                placeholder="Enter your last name"
                {...register("lastName")}
                onFocus={handleClearError}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                // required
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
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
                placeholder="example@email.com"
                onFocus={() => error && dispatch(clearError())}
                {...register("email")}
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
                onFocus={handleClearError}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <PasswordInput
                id="confirmPassword"
                label="Confirm Password"
                placeholder="Enter your password"
                {...register("confirmPassword")}
                onFocus={handleClearError}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
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
        <div className="text-center mt-4 space-y-2">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Login
            </Link>
          </p>

          <Link
            to="/"
            className="block mr-2 text-blue-600 dark:text-blue-400 font-bold hover:underline text-sm"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};
