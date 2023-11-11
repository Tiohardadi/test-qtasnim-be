const { ProductType } = require('../models');

exports.createProductType = async (req, res) => {
  try {
    const productType = await ProductType.create(req.body);
    res.status(201).json({ message: 'ProductType created successfully', status: 'success', data: productType });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

exports.getProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductType.findAll();
    res.status(200).json({ message: 'ProductTypes retrieved successfully', status: 'success', data: productTypes });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

exports.updateProductType = async (req, res) => {
  const { id } = req.params;
  try {
    await ProductType.update(req.body, { where: { id } });
    const updatedProductType = await ProductType.findByPk(id);
    res.status(200).json({ message: 'ProductType updated successfully', status: 'success', data: updatedProductType });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};

exports.deleteProductType = async (req, res) => {
  const { id } = req.params;
  try {
    await ProductType.destroy({ where: { id } });
    res.status(200).json({ message: 'ProductType deleted successfully', status: 'success', data: null });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', status: 'error', error });
  }
};
