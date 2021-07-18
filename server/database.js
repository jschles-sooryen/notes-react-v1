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

    db.run(`
      CREATE TABLE folders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text
      );
      CREATE TABLE notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text,
        description text,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        folder_id INTEGER,
        FOREIGN_KEY(folder_id) REFERENCES folders(id)
      );
    `,
    (error) => {
      if (error) {
        // Table already created
      } else {
        // Table just created, creating some rows
        const insert = 'INSERT INTO folders (name) VALUES (?)';
        db.run(insert, ['Notes']);
      }
    });
  }
});

module.exports = db;
