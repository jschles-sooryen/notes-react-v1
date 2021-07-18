// Create express app
const express = require('express');
const md5 = require('md5');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database.js');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
const HTTP_PORT = 8000;
// Start server
app.listen(HTTP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT));
});
// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Ok' });
});

// Insert here other API endpoints
// app.get('/api/user/:id', (req, res, next) => {
//   const sql = 'select * from user where id = ?';
//   const params = [req.params.id];
//   db.get(sql, params, (err, row) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: row,
//     });
//   });
// });

app.get('/api/folders', (req, res) => {
  const sql = 'select * from folders';
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

app.post('/api/folders', (req, res) => {
  const data = {
    name: req.body.name,
  };
  const sql = 'INSERT INTO folders (name) VALUES (?)';
  const params = [data.name];
  db.run(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data,
      id: this.lastID,
    });
  });
});

// app.patch('/api/user/:id', (req, res, next) => {
//   const data = {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password ? md5(req.body.password) : null,
//   };
//   db.run(
//     `UPDATE user set
//          name = COALESCE(?,name),
//          email = COALESCE(?,email),
//          password = COALESCE(?,password)
//          WHERE id = ?`,
//     [data.name, data.email, data.password, req.params.id],
//     function (err, result) {
//       if (err) {
//         res.status(400).json({ error: res.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data,
//         changes: this.changes,
//       });
//     },
//   );
// });

// app.delete('/api/user/:id', (req, res, next) => {
//   db.run(
//     'DELETE FROM user WHERE id = ?',
//     req.params.id,
//     function (err, result) {
//       if (err) {
//         res.status(400).json({ error: res.message });
//         return;
//       }
//       res.json({ message: 'deleted', changes: this.changes });
//     },
//   );
// });

// Default response for any other request
app.use((req, res) => {
  res.status(404);
});
