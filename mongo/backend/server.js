const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000; // You can change this port number if needed

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
const mongoURI = 'mongodb+srv://jagathsri:hello0507@cluster0.hqi5x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the User schema
const userSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    bio: { type: String, required: false },
}, { timestamps: true });

// Create the User model
const User = mongoose.model('User', userSchema);

// CRUD Routes
// Create a user
app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read a user by ID
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({}); // Retrieve all users
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

/*// Get user by user_id
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findOne({ user_id: req.params.id }); // Find user by user_id
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user' });
    }
});
*/

// Update a user by ID
app.put('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ user_id: req.params.id }, req.body, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a user by ID
app.delete('/api/users/:id', async (req, res) => {
    try {
        const result = await User.findOneAndDelete({ user_id: req.params.id });
        if (!result) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});