import mongoose from 'mongoose';
import { ConnectionOptions } from 'tls';

const connectionString = process.env.ATLAS_URI as string;

const connectToDatabaseViaLamba = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'notes-app',
    } as ConnectionOptions);

    console.log('Succesfully connected to MongoDB.');
  } catch (e) {
    console.error('Error connecting to database: ', e);
  }
};

export default connectToDatabaseViaLamba;
