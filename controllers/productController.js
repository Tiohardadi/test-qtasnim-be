const { Product, ProductType } = require('../models');

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    console.log(req.body);
    res.status(201).json({ message: 'Product created successfully', status: 'success', data: product });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: [{ model: ProductType }] });
    res.status(200).json({ message: 'Products retrieved successfully', status: 'success', data: products });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.update(req.body, { where: { id } });
    const updatedProduct = await Product.findByPk(id, { include: [{ model: ProductType }] });
    res.status(200).json({ message: 'Product updated successfully', status: 'success', data: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.destroy({ where: { id } });
    res.status(200).json({ message: 'Product deleted successfully', status: 'success', data: null });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};
