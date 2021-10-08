import mongoose, { Connection } from 'mongoose';
import { ConnectionOptions } from 'tls';

const connectionString = process.env.ATLAS_URI as string;

let dbConnection: Connection;

export default {
  async connectToServer() {
    try {
      await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectionOptions);

      dbConnection = mongoose.connection;

      console.log('Succesfully connected to MongoDB.');
    } catch (e) {
      console.error('Error connecting to database: ', e);
    }
  },

  getDb() {
    return dbConnection;
  },
};
