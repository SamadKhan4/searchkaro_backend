const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Location = require('./models/Location');
const Rating = require('./models/Rating');
const LegalPolicy = require('./models/LegalPolicy');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  });

// Sample data
const categories = [
  { srNo: 1, role: "Buyer", category: "Clothes", product: "Jeans", popular: true },
  { srNo: 2, role: "Buyer", category: "Mobile", product: "iPhone", popular: false },
  { srNo: 3, role: "Seller", category: "Laptop", product: "Dell", popular: false }
];

const locations = [
  { srNo: 1, role: "Buyer", location: "London", region: "Europe", popular: true },
  { srNo: 2, role: "Buyer", location: "Mumbai", region: "Asia", popular: false },
  { srNo: 3, role: "Seller", location: "Berlin", region: "Europe", popular: true },
  { srNo: 4, role: "Buyer", location: "Toronto", region: "North America", popular: true },
  { srNo: 5, role: "Buyer", location: "Paris", region: "Europe", popular: false },
  { srNo: 6, role: "Seller", location: "Berlin", region: "Europe", popular: true }
];

const ratings = [
  { srNo: 1, categories: "Jeans", shop: "Clothes", rating: 4.5, review: true },
  { srNo: 2, categories: "iPhone", shop: "Mobile", rating: 3.5, review: false },
  { srNo: 3, categories: "Dell", shop: "Laptop", rating: 3.5, review: false },
  { srNo: 4, categories: "Boots", shop: "Shoes", rating: 4.5, review: true },
  { srNo: 5, categories: "Pizzaria Cafe", shop: "Food", rating: 4.5, review: false },
  { srNo: 6, categories: "Wellness Oasis Clinic", shop: "Hospital", rating: 3.5, review: true }
];

const legalPolicies = [
  {
    question: "How do I book a service?",
    answer: "You can book a service by selecting your preferred category, choosing a time slot, and confirming the booking via the app."
  },
  {
    question: "How do I track my service provider?",
    answer: "You can track your service provider in real-time through the tracking feature available in your active bookings section."
  },
  {
    question: "What if I face an issue with the service?",
    answer: "If you face any issue with the service, you can report it through the app's support section or contact our customer service team directly."
  },
  {
    question: "How do I rate and review a service?",
    answer: "After the service is completed, you will receive a notification to rate and review your experience. You can provide ratings and write your feedback."
  },
  {
    question: "What services does this app provide?",
    answer: "Our app provides a wide range of services including home cleaning, repairs, beauty services, healthcare, and many more professional services."
  },
  {
    question: "Is registration required to use the app?",
    answer: "Yes, registration is required to book services and track your orders. You can register using your email or phone number."
  },
  {
    question: "How can I cancel or reschedule a service?",
    answer: "You can cancel or reschedule a service by going to your bookings section and selecting the modify or cancel option. Please note that cancellation policies may apply."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept various payment methods including credit/debit cards, digital wallets, UPI, and cash on delivery for selected services."
  }
];

async function seedDatabase() {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await Location.deleteMany({});
    await Rating.deleteMany({});
    await LegalPolicy.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Insert sample data
    await Category.insertMany(categories);
    console.log('Inserted categories');
    
    await Location.insertMany(locations);
    console.log('Inserted locations');
    
    await Rating.insertMany(ratings);
    console.log('Inserted ratings');
    
    await LegalPolicy.insertMany(legalPolicies);
    console.log('Inserted legal policies');
    
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();