const { Order, Product, Cart, OrderItem } = require('../../models/index');
const responses = require('../../responses/responses');

exports.createOrder = async (req, res) => {
    const { userId, paymentId } = req.body;

    try {
        const cartItems = await Cart.findAll({where: {userId}});

        if (cartItems.length === 0) {
            req.status(400).json({message: "No item found in cart"});
        }

        const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * item.Product.price, 0);

        const newOrder = await Order.create({
            userId,
            totalAmount,
            paymentId,
            status: 'Pending'
        })

        const orderItems = cart.cartItems.map(item => ({
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.Product.price
        }))

        await OrderItem.bulkCreate(orderItems);
        await cart.destroy({where: {userId}});
        return res.status(201).json(newOrder);
    } catch (error) {
        console.log("Error creating order: " + error);
        return res.status(500).json({message: "Error creating order"})
    }
}