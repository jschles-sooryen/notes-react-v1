import mongoose from 'mongoose';
import { ConnectionOptions } from 'tls';

const connectionString = process.env.ATLAS_URI as string;

const connectToDatabaseViaLamba = async (): Promise<any> => {
  const connection = await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'notes-app',
  } as ConnectionOptions);

  return connection;
};

export default connectToDatabaseViaLamba;
