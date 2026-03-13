import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductRequest } from "../../redux/Slices/productSlice";
import type { RootState } from "../../redux/store/store";
import ProductsCard from "../../components/ProductCard/ProductsCard";
import { Spinner } from "../../components/Spinner/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
export const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(
    (state: RootState) => state.products,
  );

  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const hasShownWelcome = useRef(false);

  useEffect(() => {
    if (location.state?.showWelcome && user && !hasShownWelcome.current) {
      const name = user.user?.firstName;
      alert(`Welcome ${name}! Login successfully!`);
      hasShownWelcome.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, user, navigate, location.pathname]);

  useEffect(() => {
    dispatch(fetchProductRequest());
  }, [dispatch]);

  if (loading && products.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      {products.length === 0 ? (
        <p className="text-gray-400 italic text-center mt-20 text-2xl">
          No products added yet!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <ProductsCard key={item._id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};
