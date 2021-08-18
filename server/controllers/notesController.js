const db = require('../database');

const notesController = {
  getNotes: (req, res) => {
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
  },
  createNote: (req, res) => {
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
  },
  updateNote: (req, res) => {
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
  },
  deleteNote: (req, res) => {
    db.query(
      'DELETE FROM notes WHERE id = ?',
      req.params.noteId,
      (err) => {
        if (err) {
          res.status(400).json({ error: res.message });
          return;
        }

        res.json({ message: 'deleted', changes: this.changes });
      },
    );
  },
};

module.exports = notesController;
