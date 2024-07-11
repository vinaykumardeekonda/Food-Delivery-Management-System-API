const { Product } = require('../../models/index');
const upload = require('../../middleware/uploads');

exports.createProduct = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error uploading file', error: err.message });
      }

      const { productName, description, price, stock } = req.body;

      const missingFields = [];

      if (!productName) {
        missingFields.push('productName');
      }
      if (!price) {
        missingFields.push('price');
      }
      if (!stock) {
        missingFields.push('stock');
      }

      if (missingFields.length > 0) {
        return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}`,  });
      }

      const productData = {
        productName,
        description,
        price,
        stock,
        image: req.file ? req.file.path : null
      };

      const product = await Product.create(productData);

      res.status(201).json(product);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while retrieving products' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      await product.update(req.body);
      res.json(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

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
};