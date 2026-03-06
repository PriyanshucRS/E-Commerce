import React, { useState } from 'react';
import { Package, DollarSign, Image as ImageIcon, Tag, FileText, PlusCircle, X } from 'lucide-react';

export const ProductForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
     
    setTimeout(() => {
      console.log('Product Added:', formData);
      alert('Product added successfully! 🎉');
      setIsSubmitting(false);
      setFormData({ title: '', price: '', description: '', category: '', image: '' });
    }, 1500);
  };

  const handleCancel = () => {
      setFormData({ title: '', price: '', description: '', category: '', image: '' });
    
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-white">
            <PlusCircle size={24} />
            <h2 className="text-xl font-bold uppercase tracking-wide">Add New Product</h2>
          </div>
         
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-1">
              <label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Package size={16} className="text-blue-500" /> Product Name
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="e.g. Wireless Headphones"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-1">
              <label htmlFor="price" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <DollarSign size={16} className="text-blue-500" /> Price (USD)
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="29.99"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label htmlFor="category" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Tag size={16} className="text-blue-500" /> Category
            </label>
            <select
              id="category"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none bg-white"
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
            <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText size={16} className="text-blue-500" /> Detailed Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Tell customers about your product..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image URL */}
          <div className="space-y-1">
            <label htmlFor="image" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <ImageIcon size={16} className="text-blue-500" /> Product Image URL
            </label>
            <input
              id="image"
              type="url"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
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
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transform hover:-translate-y-0.5 transition duration-200 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
