import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import ProductCard from "../../components/ProductCard/ProductsCard";


import {
  incrementQuantity,
  decrementQuantity,
  removeFromCartRequest,
  updateCartQuantityRequest 

} from "../../redux/Slices/cartSlice";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export const Cart = () => {
  const { items } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();


const handleIncrement = (item: any) => {

  const newQty = item.quantity + 1;
 
  dispatch(incrementQuantity(item.productId));
  dispatch(updateCartQuantityRequest({ id: item.productId, quantity: newQty }));
};

const handleDecrement = (item: any) => {
  if (item.quantity > 1) {
    const newQty = item.quantity - 1;
    dispatch(decrementQuantity(item.productId));
    dispatch(updateCartQuantityRequest({ id: item.productId, quantity: newQty }));
  }
};



  const handleRemove = (id : string) => {
    Swal.fire({
      title: "Remove this item?",
      icon: "warning",
      width: "300px",
      padding: "1rem",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      iconColor: "#f87171",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCartRequest(id));

        Swal.fire({
          title: "Removed!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          width: "250px",
        });
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8  min-h-[calc(100vh-64px)] overflow-hidden">
      <h2 className="flex items-center justify-center text-3xl font-bold mb-6 pb-2">
        My Carts
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-400 italic text-center mt-20 text-2xl">
          Your Cart is empty!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(items)  && items.map((item) =>{
           if (!item) return null;
       return   ( 
            
            
            <div
             key={item.productId || item._id || item.id} 
              className="flex flex-col bg-white p-4 rounded-lg shadow"
            >
              <ProductCard product={item} showAddToCart={false} />

              <div className="flex items-center justify-between mt-4 bg-gray-50 p-2 rounded-lg">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDecrement(item)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                  >
                    -
                  </button>
                  <span className="font-bold text-lg">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  
                  onClick={() => handleRemove(item.productId)}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors duration-200"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <div>
                <button
                  className="bg-amber-300 rounded-lg w-full py-1 text-black text-2xl hover:bg-amber-500 
          font-semibold transition-all shadow-md cursor-pointer"
                >
                  Buy now
                </button>
              </div>
            </div>
          )}
          
          )}
        </div>
      )}
    </div>
  );
};
