const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'react_notes',
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to Database: \n', err);
    throw err;
  }
  console.log('Database Connected!');
});

module.exports = db;
