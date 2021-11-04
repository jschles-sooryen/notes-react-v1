import mongoose from 'mongoose';
import { ConnectionOptions } from 'tls';

const connectionString = process.env.ATLAS_URI as string;

const connectToDatabaseViaLamba = async () => {
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'notes-app',
  } as ConnectionOptions);

  console.log('DB Connected');
};

export default connectToDatabaseViaLamba;
