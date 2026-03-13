import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./redux/store/store";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { WatchList } from "./pages/watchlist/Watchlist";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home/Home";
import { Cart } from "./pages/cart/Cart";
import { ProductForm } from "./pages/ProductForm/ProductForm";
import { NotFound } from "./pages/NotFound/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { fetchCartRequest } from "./redux/Slices/cartSlice";
import { fetchWatchlistRequest } from "./redux/Slices/watchlistSlice";
import { fetchProductRequest } from "./redux/Slices/productSlice";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartRequest());
      dispatch(fetchWatchlistRequest());
      dispatch(fetchProductRequest());
    }
  }, [dispatch, user]);

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <WatchList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cartview"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRoute>
                <ProductForm />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
