const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; 

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      
      cart = new Cart({ userId, items: [{ productId, quantity: quantity || 1 }] });
    } else {
     
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
     
        cart.items[itemIndex].quantity += (quantity || 1);
      } else {
        
        cart.items.push({ productId, quantity: quantity || 1 });
      }
    }

    await cart.save();
   
    const updatedCart = await Cart.findOne({ userId }).populate('items.productId');
    res.status(200).json(updatedCart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id; 

    
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
     
      return res.status(200).json({ items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};