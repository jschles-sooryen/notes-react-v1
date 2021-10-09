/* eslint-disable import/first */
import 'dotenv/config';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './database';
import routes from './routes';
import Folder from './models/Folder';

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
    console.log(`Server running on port ${HTTP_PORT}`);
  });
};

const initialDBSetup = async () => {
  const folders = await Folder.find({});
  // Create default starting folder if no folders exist
  if (!folders.length) {
    const firstFolder = await new Folder({ name: 'New Folder' });
    await firstFolder.save();
  }
};

const startServer = async () => {
  console.log('Starting Server...');
  try {
    await db.connectToServer();
    await initialDBSetup();
    listen();
  } catch (e) {
    console.error('Error starting server: \n', e);
  }
};

startServer();
