import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import ProductCard from "../../components/ProductCard/ProductsCard";
import { Spinner } from "../../components/Spinner/Spinner";
import { useCallback } from "react";

export const WatchList = () => {
  const { items, loading } = useSelector((state: RootState) => ({
    items: state.watchlist.items,
    loading: state.watchlist.loading,
  }));
  const { products } = useSelector((state: RootState) => state.products);


  const isProductAvailable = useCallback((itemId: string) => {
    return products.some(
      (product: any) => (product._id || product.id) === itemId,
    );
  },[products] );


  if (loading && items.length === 0) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="flex items-center justify-center text-3xl font-bold mb-6 pb-2">
        My WatchList
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-400 italic text-center mt-20 text-2xl">
          Your watchlist is empty!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const itemId = item.productId || item._id;
            const isAvailable = isProductAvailable(itemId);

            return (
              <div
                key={itemId}
                className={`flex flex-col relative ${isAvailable ? "" : "opacity-60"}`}
              >
                <ProductCard
                  product={{
                    ...item,
                    _id: item.productId,
                  }}
                  showDeleteProduct={false}
                  isUnavailable={!isAvailable}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
