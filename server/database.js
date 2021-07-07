/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

const DBSOURCE = 'db.sqlite';

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');

    // Commenting out for now until schema is established

    // db.run(`CREATE TABLE user (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         name text,
    //         email text UNIQUE,
    //         password text,
    //         CONSTRAINT email_unique UNIQUE (email)
    //         )`,
    // (error) => {
    //   if (error) {
    //     console.error('Error connecting to SQLite database: ', error);
    //     // Table already created
    //   } else {
    //     // Table just created, creating some rows
    //     // const insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
    //     // db.run(insert, ['admin', 'admin@example.com', md5('admin123456')]);
    //     // db.run(insert, ['user', 'user@example.com', md5('user123456')]);
    //   }
    // });
  }
});

module.exports = db;
