import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { WatchList } from "./pages/watchlist/Watchlist";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home/Home";
import { Cart } from "./pages/cart/Cart";
import { ProductForm } from "./pages/ProductForm/ProductForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartRequest } from "./redux/Slices/cartSlice";
import { fetchWatchlistRequest } from "./redux/Slices/watchlistSlice";
// import { WelcomeSlide } from "./pages/welcome/Welcome";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartRequest());
      dispatch(fetchWatchlistRequest());
    }
  }, [dispatch, user]);

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/cartview" element={<Cart />} />
          <Route path="/addproduct" element={<ProductForm />} />
          {/* <Route path="/welcome" element={<WelcomeSlide/>} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
