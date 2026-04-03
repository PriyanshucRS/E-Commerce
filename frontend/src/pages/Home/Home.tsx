import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductRequest } from "../../redux/Slices/productSlice";
import type { RootState } from "../../redux/store/store";
import ProductsCard from "../../components/ProductCard/ProductsCard";
import { Spinner } from "../../components/Spinner/Spinner";

export const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(
    (state: RootState) => state.products,
  );

const handleFetchProducts = useCallback(() => {
  dispatch(fetchProductRequest());
}, [dispatch]);


useEffect(() => {
  handleFetchProducts();
}, [handleFetchProducts]);


  const memoizedProducts = useMemo(() => products, [products]);

  if (loading && products.length === 0) {
    return <Spinner />;
  }

  return (
    // <div className="container mx-auto px-4 py-8">
     <div className="container mx-auto px-3 py-6>
      {/* <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1> */}
          <h1 className="text-3xl font-bold text-center mb-8">Our Products Lists</h1>
      {memoizedProducts.length === 0 ? (
        <p className="text-gray-400 italic text-center mt-20 text-2xl">
          No products added yet!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {memoizedProducts.map((item) => (
            <ProductsCard key={item._id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};
