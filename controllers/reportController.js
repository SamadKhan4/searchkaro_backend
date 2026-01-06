// Placeholder controller for reports
let reports = [
  { id: 1, title: 'Monthly Usage Report', date: '2025-12-01' },
  { id: 2, title: 'User Activity Report', date: '2025-12-05' }
];

let nextId = 3;

// Get all reports
exports.getReports = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      reports
    });
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new report
exports.addReport = async (req, res) => {
  try {
    const { title, date } = req.body;
    
    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }
    
    const newReport = {
      id: nextId++,
      title,
      date
    };
    
    reports.push(newReport);
    
    res.status(201).json({
      success: true,
      message: 'Report added successfully',
      report: newReport
    });
  } catch (error) {
    console.error('Add report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a report
exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date } = req.body;
    
    const reportId = parseInt(id);
    const reportIndex = reports.findIndex(report => report.id === reportId);
    
    if (reportIndex === -1) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }
    
    reports[reportIndex].title = title;
    reports[reportIndex].date = date;
    
    res.status(200).json({
      success: true,
      message: 'Report updated successfully',
      report: reports[reportIndex]
    });
  } catch (error) {
    console.error('Update report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a report
exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const reportId = parseInt(id);
    const reportIndex = reports.findIndex(report => report.id === reportId);
    
    if (reportIndex === -1) {
      return res.status(404).json({ message: 'Report not found' });
    }
    
    reports.splice(reportIndex, 1);
    
    res.status(200).json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error) {
    console.error('Delete report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};