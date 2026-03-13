import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import ProductCard from "../../components/ProductCard/ProductsCard";
import {
  removeFromCartRequest,
  updateCartQuantityRequest,
} from "../../redux/Slices/cartSlice";
import { Trash2, ShoppingBag } from "lucide-react";
import Swal from "sweetalert2";

export const Cart = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const { products } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();

  const isProductAvailable = (itemId: string) => {
    return products.some(
      (product: any) => (product._id || product.id) === itemId,
    );
  };

  const availableItems = items.filter((item) => {
    const itemId = item.productId || item._id || item.id;
    return isProductAvailable(itemId);
  });

  const availableTotalPrice = availableItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const hasAvailableItems = availableItems.length > 0;

  const handleIncrement = (item: any) => {
    const itemId = item.productId || item._id || item.id;
    const newQty = item.quantity + 1;
    dispatch(updateCartQuantityRequest({ id: itemId, quantity: newQty }));
  };

  const handleDecrement = (item: any) => {
    if (item.quantity > 1) {
      const itemId = item.productId || item._id || item.id;
      const newQty = item.quantity - 1;
      dispatch(updateCartQuantityRequest({ id: itemId, quantity: newQty }));
    }
  };

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Remove this item?",
      text: "Are you sure you want to remove this from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCartRequest(id));
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-10 ">
      <div className="flex items-center justify-between mb-10 border-b dark:border-gray-800 pb-5 transition-colors duration-300">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 flex items-center gap-3">
          <ShoppingBag className="text-blue-600 dark:text-blue-400" size={36} />
          My Cart
        </h2>
        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1 rounded-full font-bold">
          {items.length} {items.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 space-y-4">
          <p className="text-gray-400 dark:text-gray-500 italic text-2xl">
            Your cart is empty!
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((item) => {
              const itemId = item.productId || item._id || item.id;
              const isAvailable = isProductAvailable(itemId);

              return (
                <div
                  key={itemId}
                  className={`bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 flex flex-col ${
                    isAvailable ? "" : "opacity-60"
                  }`}
                >
                  <div className="flex-1">
                    <ProductCard
                      product={item}
                      showAddToCart={false}
                      showDeleteProduct={false}
                      isUnavailable={!isAvailable}
                    />

                    <div className="mt-4 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-700">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        Item total:
                      </span>
                      <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4 bg-white dark:bg-gray-900 px-3 py-1 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                      <button
                        onClick={() => handleDecrement(item)}
                        disabled={!isAvailable}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 font-bold transition-colors ${
                          isAvailable
                            ? "hover:bg-gray-100 dark:hover:bg-gray-800"
                            : "cursor-not-allowed opacity-50"
                        }`}
                      >
                        -
                      </button>
                      <span className="font-bold text-lg min-w-[20px] text-center text-gray-800 dark:text-gray-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(item)}
                        disabled={!isAvailable}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 font-bold transition-colors ${
                          isAvailable
                            ? "hover:bg-gray-100 dark:hover:bg-gray-800"
                            : "cursor-not-allowed opacity-50"
                        }`}
                      >
                        +
                      </button>
                    </div>
                    {!isAvailable && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-lg font-medium bg-red-100 text-red-800 dark:bg-gray-900/30 dark:text-gray-400 border border-gray-200 dark:border-gray-800">
                      
                        Not Available
                      </span>
                    )}
                    
                    <button
                      onClick={() => handleRemove(itemId)}
                      className="p-3 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl dark:shadow-gray-950 border border-gray-100 dark:border-gray-700 sticky top-24 transition-colors duration-300">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-4">
                Order Summary
              </h3>

              <div className="space-y-4 mb-8">
                <div className="max-h-48 overflow-y-auto space-y-3 pr-2 mb-6 border-b dark:border-gray-700 pb-6">
                  {items.map((item, index) => {
                    const itemId = item.productId || item._id || item.id;
                    const isAvailable = isProductAvailable(itemId);

                    return (
                      <div
                        key={index}
                        className={`flex justify-between items-center text-sm ${
                          isAvailable ? "" : "opacity-50 line-through"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-700 dark:text-gray-200 truncate w-32">
                            {item.title}
                            {!isAvailable && (
                              <span className="text-xs text-red-500 ml-1">
                                (Not Available)
                              </span>
                            )}
                          </span>
                          <span className="text-gray-400 dark:text-gray-500 text-xs">
                            Qty: {item.quantity}
                          </span>
                        </div>
                        <span
                          className={`font-bold ${isAvailable ? "text-gray-600 dark:text-gray-300" : "text-red-500"}`}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Cart Subtotal</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    ${availableTotalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="pt-5 border-t dark:border-gray-700 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    Grand Total
                  </span>
                  <span className="text-lg font-black text-blue-600 dark:text-blue-400">
                    ${availableTotalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                disabled={!hasAvailableItems}
                className="w-full bg-orange-500 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-500 
             disabled:bg-gray-400 disabled:dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed 
             disabled:scale-100 disabled:shadow-none
             text-white py-3 rounded-xl text-lg font-bold transition-all shadow-md active:scale-95"
              >
                {hasAvailableItems ? "Buy Now" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
