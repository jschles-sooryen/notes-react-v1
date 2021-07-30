// Create express app
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = require('./database');

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
  db.query(sql, params, (err, results) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: results,
    });
  });
});

app.post('/api/folders', (req, res) => {
  const data = {
    name: req.body.name,
  };
  const sql = 'INSERT INTO folders (name) VALUES (?)';
  const params = [data.name];
  db.query(sql, params, (err) => {
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

app.patch('/api/folders/:id', (req, res) => {
  const data = {
    name: req.body.name,
  };
  db.query(
    `UPDATE folders SET
         name = COALESCE(?,name)
         WHERE id = ?`,
    [data.name, req.params.id],
    (err) => {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: 'success',
        data,
        changes: this.changes,
      });
    },
  );
});

app.delete('/api/folders/:id', (req, res) => {
  db.query(
    'DELETE FROM folders WHERE id = ?',
    req.params.id,
    (err) => {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }

      db.query(
        'DELETE FROM notes WHERE folder_id = ?',
        req.params.id,
        (e) => {
          if (e) {
            res.status(400).json({ error: res.message });
            return;
          }

          res.json({ message: 'deleted', changes: this.changes });
        },
      );
    },
  );
});

app.get('/api/folders/:id/notes', (req, res) => {
  const sql = 'SELECT * FROM notes WHERE folder_id = ?';
  db.query(sql, req.params.id, (err, results) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: results,
    });
  });
});

app.post('/api/folders/:id/notes', (req, res) => {
  const data = {
    name: req.body.name,
    description: req.body.description,
  };
  const sql = `
    INSERT INTO notes (name, description, folder_id)
    VALUES (?,?,?)
  `;
  const params = [data.name, data.description, req.params.id];
  db.query(sql, params, (err, results) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: { ...data, id: results.insertId },
      id: this.lastID,
    });
  });
});

app.patch('/api/folders/:id/notes/:noteId', (req, res) => {
  const data = {
    name: req.body.name,
    description: req.body.description,
  };
  const sql = `
    UPDATE notes
    SET name = COALESCE(?,name), description = COALESCE(?,description), updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  const params = [data.name, data.description, req.params.noteId];
  db.query(sql, params, (err) => {
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

// Default response for any other request
app.use((req, res) => {
  res.status(404);
});
