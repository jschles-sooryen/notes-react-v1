import { MongoClient, Db } from 'mongodb';
import { ConnectionOptions } from 'tls';

const connectionString = process.env.ATLAS_URI as string;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectionOptions);

let dbConnection: Db;

export default {
  connectToServer(callback: (...args: any[]) => void) {
    client.connect((err, db) => {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db('notes');

      return callback();
    });
  },

  getDb() {
    return dbConnection;
  },
};
