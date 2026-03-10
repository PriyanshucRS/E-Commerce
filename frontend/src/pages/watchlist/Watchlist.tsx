import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import ProductCard from "../../components/ProductCard/ProductsCard";

export const WatchList = () => {
  const { items } = useSelector((state: RootState) => ({
    items: state.watchlist.items,
  }));

  return (
    <div className="container mx-auto px-4 py-8  min-h-[calc(100vh-64px)] overflow-hidden">
      <h2 className="flex items-center justify-center text-3xl font-bold mb-6 pb-2">
        My WatchList
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-400 italic text-center mt-20 text-2xl">
          Your watchlist is empty!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.productId || item._id} className="flex flex-col">
              <ProductCard
                product={{
                  ...item,
                  _id: item.productId,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
