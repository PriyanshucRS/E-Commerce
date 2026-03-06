import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductRequest } from "../../redux/Slices/productSlice";
import type { RootState } from "../../redux/store/store"; 
import ProductsCard from "../../components/ProductCard/ProductsCard";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProductRequest());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
         
          <ProductsCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Home;
