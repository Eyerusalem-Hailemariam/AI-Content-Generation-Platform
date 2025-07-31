require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT 
const router = require('./routes');
const app = express();

app.use(cors({
    origin: function (origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }));
  
app.use(express.json());

app.use(router);

const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully") )
.catch((err) => console.error('MongoDB connection error:', err))

app.get('/', (req, res) => {
    res.send('API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

module.exports = app;