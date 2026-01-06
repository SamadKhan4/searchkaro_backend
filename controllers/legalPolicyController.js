const LegalPolicy = require('../models/LegalPolicy');

// Get all legal policies
exports.getLegalPolicies = async (req, res) => {
  try {
    const legalPolicies = await LegalPolicy.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      legalPolicies
    });
  } catch (error) {
    console.error('Get legal policies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new legal policy
exports.addLegalPolicy = async (req, res) => {
  try {
    const { question, answer } = req.body;
    
    // Validation
    if (!question || !answer) {
      return res.status(400).json({ message: 'Question and answer are required' });
    }
    
    const newLegalPolicy = new LegalPolicy({
      question,
      answer
    });
    
    const savedLegalPolicy = await newLegalPolicy.save();
    
    res.status(201).json({
      success: true,
      message: 'Legal policy added successfully',
      legalPolicy: savedLegalPolicy
    });
  } catch (error) {
    console.error('Add legal policy error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a legal policy
exports.updateLegalPolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;
    
    const updateData = {};
    if (question !== undefined) updateData.question = question;
    if (answer !== undefined) updateData.answer = answer;
    
    const updatedLegalPolicy = await LegalPolicy.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedLegalPolicy) {
      return res.status(404).json({ message: 'Legal policy not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Legal policy updated successfully',
      legalPolicy: updatedLegalPolicy
    });
  } catch (error) {
    console.error('Update legal policy error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a legal policy
exports.deleteLegalPolicy = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedLegalPolicy = await LegalPolicy.findByIdAndDelete(id);
    
    if (!deletedLegalPolicy) {
      return res.status(404).json({ message: 'Legal policy not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Legal policy deleted successfully'
    });
  } catch (error) {
    console.error('Delete legal policy error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};