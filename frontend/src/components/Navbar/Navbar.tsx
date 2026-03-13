import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import cartIcon from "../../assets/cartLogo.png";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { logout } from "../../redux/Slices/authSlice";
import { clearCart } from "../../redux/Slices/cartSlice";
import { clearWatchList } from "../../redux/Slices/watchlistSlice";
import logo from "../../assets/logo.png";
import { useTheme } from "../../context/ThemeContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { items: watchItems } = useSelector(
    (state: RootState) => state.watchlist,
  );
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const watchCount = watchItems.length;
  const cartCount = cartItems.length;

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearWatchList());
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between px-6 md:px-10 py-4 bg-gray-100 dark:bg-gray-900 shadow-md transition-colors duration-300">
        <div className="flex text-xl md:text-2xl font-bold text-blue-600">
          <Link to="/" className="flex items-center gap-4">
            <img
              src={logo}
              alt="logo"
              className="h-14 w-auto transition-transform group-hover:scale-110"
            />
            <span className="dark:text-blue-400">E-Commerce Website</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center flex-1 justify-end space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors ${
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              }`
            }
          >
            Home
          </NavLink>

          {user && (
            <NavLink
              to="/addproduct"
              className={({ isActive }) =>
                `flex items-center gap-2 transition-colors ${
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                }`
              }
            >
              Add Product
            </NavLink>
          )}

          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors ${
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              }`
            }
          >
            <span className="transition-colors">WatchList</span>

            {watchCount > 0 && (
              <span className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-700 text-[12px] font-bold px-2 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                {watchCount}
              </span>
            )}
          </NavLink>

          {/* Desktop Cart View */}
          <NavLink
            to="/cartview"
            className={({ isActive }) =>
              `relative group p-2 flex flex-col items-center transition-colors ${
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-500"
              }`
            }
          >
            <div className="relative">
              <img
                src={cartIcon}
                alt="cartLogo"
                className="h-10 w-auto transition-transform group-hover:scale-110 dark:invert"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span
              className={`text-[11px] font-medium transition-colors -mt-1 group-hover:text-blue-500 ${"text-inherit"}`}
            >
              My Cart
            </span>
          </NavLink>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={22} />
            ) : (
              <Sun size={22} className="text-yellow-400" />
            )}
          </button>

          <div className="flex items-center">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all ml-2 shadow-sm"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all ml-2 shadow-sm">
                  Login
                </button>
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={24} />
            ) : (
              <Sun size={24} className="text-yellow-400" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg absolute w-full left-0 py-6 px-6 space-y-6 flex flex-col items-center transition-colors duration-300">
          {/* Home Link */}
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 text-base font-medium border-l-4 transition-colors duration-200 ${
                isActive
                  ? "bg-blue-50 dark:bg-gray-800 border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white"
              }`
            }
          >
            Home
          </NavLink>
          {user && (
            <NavLink
              to="/addproduct"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 text-base font-medium border-l-4 transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-50 dark:bg-gray-800 border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white"
                }`
              }
            >
              Add Product
            </NavLink>
          )}

          {/* Watchlist Mobile */}
          <NavLink
            to="/watchlist"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 text-base font-medium border-l-4 transition-colors duration-200 ${
                isActive
                  ? "bg-blue-50 dark:bg-gray-800 border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white"
              }`
            }
          >
            WatchList
            {watchCount > 0 && (
              <span className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200 text-gray-700 text-[12px] font-bold px-2 py-0.5 rounded-full ml-2">
                {watchCount}
              </span>
            )}
          </NavLink>

          {/* Cart Mobile */}
          <NavLink
            to="/cartview"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-base font-medium border-l-4 transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 dark:bg-gray-800 border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              }`
            }
          >
            <div className="relative flex items-center justify-center">
              <img
                src={cartIcon}
                alt="cart"
                className="h-8 w-8 object-contain dark:invert"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>

            <span className="tracking-wide">My Cart</span>
          </NavLink>

          {/* Login Button Mobile */}
          <div className="flex items-center space-x-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                  Login
                </button>
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
