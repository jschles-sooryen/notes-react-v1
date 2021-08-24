// Create express app
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = require('./database');
const routes = require('./routes');
const Folder = require('./models/Folder');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

// Server port
const HTTP_PORT = 8000;

const listen = () => {
  app.listen(HTTP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT));
  });
};

const initialDBSetup = async () => {
  const folders = await Folder.findAll();

  // Create default starting folder if no folders exist
  if (!folders.length) {
    await Folder.create({ name: 'New Folder' });
  }
};

const startServer = async () => {
  console.log('Starting Server...');
  try {
    await db.sync({ force: process.env.NODE_ENV !== 'production' });
    await initialDBSetup();
    console.log('Server successfully connected to DB.');
    listen();
  } catch (e) {
    console.error('Error starting server: \n', e);
  }
};

startServer();
