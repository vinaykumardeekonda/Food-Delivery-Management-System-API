const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();
const authRoutes = require('./routes/v1/auth/auth.routes');

app.use(bodyParser.json())

app.use('/api', authRoutes);

// db.sequelize.sync({force: false})

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
