// Placeholder controller for dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    // In a real application, this data would come from the database
    const dashboardData = {
      totalSearches: 1250,
      activeUsers: 42,
      popularCategories: ['Electronics', 'Books', 'Clothing'],
      recentActivity: [
        { id: 1, user: 'John Doe', action: 'search', timestamp: '2025-12-09T10:30:00Z' },
        { id: 2, user: 'Jane Smith', action: 'search', timestamp: '2025-12-09T09:15:00Z' },
        { id: 3, user: 'Bob Johnson', action: 'search', timestamp: '2025-12-09T08:45:00Z' }
      ]
    };

    res.status(200).json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};