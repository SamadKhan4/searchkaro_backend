const Location = require('../models/Location');

// Get all locations
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      locations
    });
  } catch (error) {
    console.error('Get locations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new location
exports.addLocation = async (req, res) => {
  try {
    const { role, location, region, popular } = req.body;
    
    // Validation
    if (!role || !location || !region) {
      return res.status(400).json({ message: 'Role, location, and region are required' });
    }
    
    // Get the next serial number
    const lastLocation = await Location.findOne().sort({ srNo: -1 });
    const nextSrNo = lastLocation ? lastLocation.srNo + 1 : 1;
    
    const newLocation = new Location({
      srNo: nextSrNo,
      role,
      location,
      region,
      popular: popular !== undefined ? popular : true
    });
    
    const savedLocation = await newLocation.save();
    
    res.status(201).json({
      success: true,
      message: 'Location added successfully',
      location: savedLocation
    });
  } catch (error) {
    console.error('Add location error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a location
exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, location, region, popular } = req.body;
    
    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      {
        role,
        location,
        region,
        popular
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Location updated successfully',
      location: updatedLocation
    });
  } catch (error) {
    console.error('Update location error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a location
exports.deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedLocation = await Location.findByIdAndDelete(id);
    
    if (!deletedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Location deleted successfully'
    });
  } catch (error) {
    console.error('Delete location error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};