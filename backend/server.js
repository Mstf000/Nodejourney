require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();  // Make sure this line comes before any app.use() calls

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);  // This line should come after const app = express();

// Start the server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port: ${process.env.PORT || 5000}`);
});
