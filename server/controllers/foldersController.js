const db = require('../database');

const foldersController = {
  getFolders: (req, res) => {
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
  },
  createFolder: (req, res) => {
    const data = {
      name: req.body.name,
    };
    const sql = 'INSERT INTO folders (name) VALUES (?)';
    const params = [data.name];
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
  },
  updateFolder: (req, res) => {
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
  },
  deleteFolder: (req, res) => {
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
  },
};

module.exports = foldersController;
