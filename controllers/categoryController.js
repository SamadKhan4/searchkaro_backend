const Category = require('../models/Category');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new category
exports.addCategory = async (req, res) => {
  try {
    const { role, category, product, popular } = req.body;
    
    // Validation
    if (!role || !category || !product) {
      return res.status(400).json({ message: 'Role, category, and product are required' });
    }
    
    // Get the next serial number
    const lastCategory = await Category.findOne().sort({ srNo: -1 });
    const nextSrNo = lastCategory ? lastCategory.srNo + 1 : 1;
    
    const newCategory = new Category({
      srNo: nextSrNo,
      role,
      category,
      product,
      popular: popular !== undefined ? popular : true
    });
    
    const savedCategory = await newCategory.save();
    
    res.status(201).json({
      success: true,
      message: 'Category added successfully',
      category: savedCategory
    });
  } catch (error) {
    console.error('Add category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, category, product, popular } = req.body;
    
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        role,
        category,
        product,
        popular
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      category: updatedCategory
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedCategory = await Category.findByIdAndDelete(id);
    
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};