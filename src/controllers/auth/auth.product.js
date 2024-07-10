const { Product } = require('../../models/index');

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error creating product'})
    }
}

exports.getProducts = async (req, res) => {
    try {
        const Products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error while retrieving products'})
    }
}

exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);
        if ( !product ) {
            res.status(404).json({message: 'product not found'})
        } else {
            res.json(product);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error retrieving product'})
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);
        if ( !product ) {
            res.status(404).json({message: 'product not found'})
        } else {
            await product.update(req.body);
            res.json(product);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating product' });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
      }
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product' });
    }
}