// Create express app
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

// Server port
const HTTP_PORT = 8000;

// Start server
app.listen(HTTP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT));
});
