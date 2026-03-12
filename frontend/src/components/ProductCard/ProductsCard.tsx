import { useDispatch, useSelector } from "react-redux";
import type { Product } from "../../types/product.types";
import { Trash2, Heart } from "lucide-react";
import { toggleWatchlistRequest } from "../../redux/Slices/watchlistSlice";
import { addToCartRequest } from "../../redux/Slices/cartSlice";
import type { RootState } from "../../redux/store/store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteProductRequest } from "../../redux/Slices/productSlice";


interface ProductCardProps {
  product: Product & { userId?: string };
  showAddToCart?: boolean;
  showDeleteProduct?: boolean;
  isUnavailable?: boolean;
}

const ProductCard = ({ product, showAddToCart = true , showDeleteProduct=true, isUnavailable = false }: ProductCardProps) => {
  const { items } = useSelector((state: RootState) => state.watchlist);
  const isInwatch = items.some(
    (item: any) =>
      (item.productId || item._id || item.id) ===
      (product.productId || product._id || product.id),
  );
  const { user } = useSelector((state: any) => state.auth);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = () => {
    if (user) return true;

    Swal.fire({
      title: "Login Required!",
      text: "Please login to continue.",
      icon: "info",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "Login",
    }).then((res) => {
      if (res.isConfirmed) navigate("/login");
    });

    return false;
  };

  const handleWatchlist = (productId: string) => {
    if (!isLoggedIn()) return;
    dispatch(toggleWatchlistRequest(productId));
  };
  const handleAddToCart = () => {
  
    if (isUnavailable) {
      Swal.fire({
        title: "Product Not Available",
        text: "This product has been removed and is no longer available.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (!isLoggedIn()) return;

    const isAlreadyInCart = cartItems.some(
      (item: any) =>
        (item.productId || item._id || item.id) ===
        (product.productId || product._id || product.id),
    );

    if (isAlreadyInCart) {
      Swal.fire({
        title: "Quantity Increased",
        text: `${product.title} quantity has been increased in your cart.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "Added to Cart",
        text: `${product.title} has been added to your cart.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }

    dispatch(addToCartRequest(product));
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductRequest(product._id || product.id));
      }
    });
  };

  
const isProductOwner = user && (user._id === product.userId || user.user?._id === product.userId);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-950 relative group overflow-hidden hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 flex flex-col border border-transparent dark:border-gray-700">
       {isProductOwner && showDeleteProduct && (
        <button
          onClick={handleDelete}
          className="absolute top-3 left-3 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-sm hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all"
        >
          <Trash2 size={18} />
        </button>
      )}
      <button
        onClick={() =>
          handleWatchlist(product.productId || product.id || product._id)
        }
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-700 transition-all text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400"
      >
        <Heart
          size={20}
          className={isInwatch ? "text-red-500 fill-red-500" : "text-gray-400 dark:text-gray-500"}
        />
      </button>
      <div className="h-48 flex items-center justify-center p-4 bg-white dark:bg-white/5">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain dark:brightness-90"
        />
      </div>
      <div className="p-4 grow">
        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="text-sm font-bold mt-2 line-clamp-2 h-10 text-gray-900 dark:text-gray-100">
          {product.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm line-clamp-3">
          {product.description}
        </p>
      </div>
      <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">${product.price}</span>

        {showAddToCart && (
          <button
            onClick={handleAddToCart}
            disabled={isUnavailable}
            className={`text-white px-4 py-2 rounded-md transition-all shadow-sm font-medium ${
              isUnavailable
                ? "bg-gray-400 dark:bg-gray-500 cursor-not-allowed opacity-60"
                : "bg-blue-500 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 cursor-pointer"
            }`}
          >
            {isUnavailable ? "Not Available" : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
