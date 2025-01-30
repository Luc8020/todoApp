require('dotenv').config();
const express = require('express');
import sequelize from './db';
const initRoutes = require('./utils/initRoutesUtil');

const app = express();
const PORT = process.env.PORT || 3000;

initRoutes(app);

sequelize.authenticate()
  .then(() => console.log('Connected to the database successfully'))
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

sequelize.sync({ force: false, alter: true })
  .then(() => {
    console.log('Database synchronized successfully!');
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  })
  .catch((err: Error) => {
    console.error('Error during database synchronization:', err.message);
  });