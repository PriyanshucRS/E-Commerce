import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import cartIcon from "../../assets/cartLogo.png";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { logout } from "../../redux/Slices/authSlice";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between px-6 md:px-10 py-4 bg-gray-100 shadow-md">
        <div className="text-xl md:text-2xl font-bold text-blue-600">
          <Link to="/">E-Commerce Website</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-10">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition-all duration-200 pb-1 
             ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-500"}`
              }
            >
              Home
            </NavLink>
          </li>
        </ul>

        <div className="hidden md:flex items-center space-x-6">
          {user && (
            <NavLink
              to="/addproduct"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-600 transition-colors ${
                  isActive ? "text-blue-600 font-semibold" : ""
                }`
              }
            >
              Add Product
            </NavLink>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/watchlist"
            className="flex items-center gap-1 p-2 group"
          >
            <h2 className="text-gray-600 group-hover:text-blue-500 transition-colors">
              WatchList
            </h2>
            {watchCount > 0 && (
              <span className="bg-gray-200 text-gray-700 text-[12px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {watchCount}
              </span>
            )}
          </NavLink>

          {/* Desktop Cart View */}
          <NavLink
            to="/cartview"
            className="relative group p-2 flex flex-col items-center"
          >
            <div className="relative">
              <img
                src={cartIcon}
                alt="cartLogo"
                className="h-10 w-auto transition-transform group-hover:scale-110"
              />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            </div>
            <span className="text-[11px] font-medium text-gray-500 group-hover:text-blue-500 transition-colors -mt-1">
             My Cart
            </span>
          </NavLink>
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 border-t border-gray-200 shadow-lg absolute w-full left-0 py-6 px-6 space-y-6 flex flex-col items-center">
          {/* Home Link */}
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
                `block px-4 py-2 text-base font-medium border-l-4 transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-50 border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
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
                    ? "bg-blue-50 border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
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
                    ? "bg-blue-50 border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                }`
              }
          >
            WatchList
            {watchCount > 0 && (
              <span className="bg-gray-200 text-gray-700 text-[12px] font-bold px-2 py-0.5 rounded-full">
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
        ? "bg-blue-50 border-blue-600 text-blue-600"
        : "border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`
  }
>

  <div className="relative flex items-center justify-center">
    <img src={cartIcon} alt="cart" className="h-8 w-8 object-contain" />
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
