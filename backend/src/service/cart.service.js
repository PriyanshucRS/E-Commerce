const Cart = require('../models/Cart');
const Product = require('../models/Product');


const getCartByUserId = async (userId) => {
   
    return await Cart.findOne({ userId });
};


const addItemToCart = async (userId, productId, quantity) => {
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      
        cart = new Cart({
            userId,
            items: [{
                productId,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity
            }]
        });
    } else {
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        
        if (itemIndex > -1) {
          
            cart.items[itemIndex].quantity += quantity;
        } else {
            
            cart.items.push({
                productId,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity
            });
        }
    }
    return await cart.save();
};


const updateItemQuantity = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
        return await cart.save();
    } else {
        throw new Error("Item not found in cart");
    }
};


const removeItemFromCart = async (userId, productId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    return await cart.save();
};

module.exports = { 
    getCartByUserId, 
    addItemToCart, 
    updateItemQuantity, 
    removeItemFromCart 
};
