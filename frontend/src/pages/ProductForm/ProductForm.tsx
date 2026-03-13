import { useState, useEffect } from "react";
import {
  Package,
  DollarSign,
  Image as ImageIcon,
  Tag,
  FileText,
  PlusCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductRequest } from "../../redux/Slices/productSlice";
import type { RootState } from "../../redux/store/store";
import { alertWarning } from "../../utils/alerts";

export const ProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.products);

 
  useEffect(() => {
    if (isSubmitting && !loading) {
      if (!error) {
       
        setFormData({
          title: "",
          price: "",
          description: "",
          category: "",
          image: "",
        });
        navigate("/");
      }
     
      setIsSubmitting(false);
    }
  }, [loading, error, isSubmitting, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    
    if (!formData.title || !formData.price || !formData.description || !formData.category || !formData.image) {
      alertWarning("Missing Fields!", "Please fill in all fields.");
      return;
    }
    
 
    const productData = {
      ...formData,
      price: parseFloat(formData.price),  
    };
    
    console.log("📝 Sending product:", productData);
    setIsSubmitting(true);
    dispatch(addProductRequest(productData));
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    });
  };

  

  return (
   <div className="bg-gray-50 dark:bg-gray-950 py-4 px-4 transition-colors duration-300 overflow-hidden mt-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
        
        {/* Header */}
        <div className="bg-blue-600 dark:bg-blue-700 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <PlusCircle size={24} />
            <h2 className="text-xl font-bold uppercase tracking-wide">
              Add New Product
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-1">
              <label
                htmlFor="title"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                <Package size={16} className="text-blue-500 dark:text-blue-400" /> Product Name
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition"
                placeholder="e.g. Wireless Headphones"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-1">
              <label
                htmlFor="price"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                <DollarSign size={16} className="text-blue-500 dark:text-blue-400" /> Price (USD)
              </label>
              <input
                id="price"
                type="number"
                min="10"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition"
                placeholder="29.99"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label
              htmlFor="category"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              <Tag size={16} className="text-blue-500 dark:text-blue-400" /> Category
            </label>
            <select
              id="category"
             className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition appearance-none resize-none"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Choose a category</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label
              htmlFor="description"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              <FileText size={16} className="text-blue-500 dark:text-blue-400" /> Detailed Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition"
              placeholder="Tell customers about your product..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image URL */}
          <div className="space-y-1">
            <label
              htmlFor="image"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              <ImageIcon size={16} className="text-blue-500 dark:text-blue-400" /> Product Image URL
            </label>
            <input
              id="image"
              type="url"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition"
              placeholder="https://images.com/sample.jpg"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Saving..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
