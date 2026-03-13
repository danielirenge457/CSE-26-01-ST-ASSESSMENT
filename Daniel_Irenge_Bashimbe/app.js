const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

// Create a model
const User = mongoose.model('User', userSchema);

// Route to handle form submission
app.post('/submit', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send('Form data saved to MongoDB!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));