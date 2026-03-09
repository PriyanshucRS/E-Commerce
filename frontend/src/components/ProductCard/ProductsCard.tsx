import { useDispatch, useSelector } from "react-redux";
import type { Product } from "../../types/product.types";
import { addToWatchlist , removeFromWatchList} from "../../redux/Slices/watchlistSlice";
import { addToCartRequest } from "../../redux/Slices/cartSlice";
import { Heart } from "lucide-react";
import type { RootState } from "../../redux/store/store";
interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}


const ProductCard = ({ product , showAddToCart = true}: ProductCardProps) => {
      
    const {items} = useSelector((state:RootState) => state.watchlist)
    const isInwatch = items.some(item=> item._id === product._id)

  const dispatch = useDispatch();

  const handleWatchlist = () => {
    if(isInwatch){
        dispatch(removeFromWatchList(product._id));
    }else{
        dispatch(addToWatchlist(product));
    }
    
  };

  const handleAddToCart = () => {
  dispatch(addToCartRequest(product));
};
  return (
    <div className="bg-white rounded-lg shadow-md relative group overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <button
          onClick={ handleWatchlist}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-all text-gray-400 hover:text-red-500"
        >
    <Heart 
  size={20} 
  className={isInwatch ? "text-red-500 fill-red-500" : "text-gray-400"} 
/>
        </button>
      <div className="h-48 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>
      <div className="p-4 grow">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="text-sm font-bold mt-2 line-clamp-2 h-10">
          {product.title}
        </h3>
        <p className="text-gray-600 mt-2 text-sm line-clamp-3">
          {product.description}
        </p>
      </div>
      <div className="p-4 border-t border-gray-100 flex justify-between items-center">
        <span className="text-lg font-bold">${product.price}</span>

    {showAddToCart && (
        <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer">
          Add to Cart
        </button>
      )}
    
      </div>
    </div>
  );
};

export default ProductCard;
