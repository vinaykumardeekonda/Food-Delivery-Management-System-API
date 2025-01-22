const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();
const authRoutes = require('./routes/v1/auth/auth.routes');

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use(bodyParser.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    message: 'Too many requests. Please try again later.'
  }
});

app.use('/api', limiter, authRoutes);

// db.sequelize.sync({force: false})

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
