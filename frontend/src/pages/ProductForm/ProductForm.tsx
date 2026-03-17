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

import { type ProductFormData, productSchema } from "../auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.products);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductFormData) => {
    dispatch(addProductRequest(data));
    reset();
    navigate("/");
  };

  const handleCancel = () => {
    reset();
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

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-1">
              <label
                htmlFor="title"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                <Package
                  size={16}
                  className="text-blue-500 dark:text-blue-400"
                />{" "}
                Product Name
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition"
                placeholder="e.g. Wireless Headphones"
                required
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-1">
              <label
                htmlFor="price"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                <DollarSign
                  size={16}
                  className="text-blue-500 dark:text-blue-400"
                />{" "}
                Price (USD)
              </label>
              <input
                id="price"
                type="number"
                min="10"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition"
                placeholder="29.99"
                required
                {...register("price")}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label
              htmlFor="category"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              <Tag size={16} className="text-blue-500 dark:text-blue-400" />{" "}
              Category
            </label>
            <select
              id="category"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition appearance-none resize-none"
              required
              {...register("category")}
            >
              <option value="">Choose a category</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
          {/* Description */}
          <div className="space-y-1">
            <label
              htmlFor="description"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              <FileText
                size={16}
                className="text-blue-500 dark:text-blue-400"
              />{" "}
              Detailed Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition"
              placeholder="Tell customers about your product..."
              {...register("description")}
              required
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div className="space-y-1">
            <label
              htmlFor="image"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              <ImageIcon
                size={16}
                className="text-blue-500 dark:text-blue-400"
              />{" "}
              Product Image URL
            </label>
            <input
              id="image"
              type="url"
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition"
              placeholder="https://images.com/sample.jpg"
              {...register("image")}
              required
            />
          </div>
          {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
          )}

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
              disabled={loading}
              className={`flex-1 px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Create Product"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};
