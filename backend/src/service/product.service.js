const Product = require('../models/Product');

const getAllProducts = async (filters = {}) => {

    return await Product.find(filters);
};

const getProductById = async (id) => {
    const product = await Product.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
};

const createProduct = async (productData) => {
    const product = new Product(productData);
    return await product.save();
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = { getAllProducts, getProductById, createProduct, deleteProduct };
