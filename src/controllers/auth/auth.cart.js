const { Cart, Product } = require('../../models/index');

exports.addItemToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cartItem = await Cart.findOne({where: {userId, productId}});
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({userId, productId, quantity});
        }

        return res.status(201).json(cartItem);
    } catch (error) {
        console.error('Error adding item to cart: ', error);
        return res.status(500).json({message: 'Error adding item to cart'})
    }
}

exports.removeItemFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const cartItem = await Cart.findOne({where: {userId, productId}})
        
        if (!cartItem) {
            return res.status(404).json({message: 'Cart item not found'})
        }

        await cartItem.destroy();
        return res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        return res.status(500).json({ message: 'Error removing item from cart' });
    }
}

exports.updateItemQuantity = async (req, res) => {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    try {
        const cartItem = await Cart.findOne({where: {userId, productId} });
        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        return res.json(cartItem)
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        return res.status(500).json({ message: 'Error updating cart item quantity' });
    }
}

exports.getUserCart = async (req, res) => {
    const { userId } = req.params;
    try {
      const cartItems = await Cart.findAll({
        where: { userId },
        include: [{ model: Product }]
      });
  
      return res.json(cartItems);
    } catch (error) {
      console.error('Error fetching user cart:', error);
      return res.status(500).json({ message: 'Error fetching user cart' });
    }
  };