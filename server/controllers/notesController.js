import Note from '../models/Note';

const notesController = {
  getNotes: async (req, res) => {
    try {
      const results = await Note.findAll({
        where: {
          folderId: req.params.id,
        },
      });
      res.json({
        message: 'success',
        data: results,
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  createNote: async (req, res) => {
    const data = {
      name: req.body.name,
      description: req.body.description,
      folderId: req.params.id,
    };

    try {
      const result = await Note.create(data);
      res.json({
        message: 'success',
        data: result.dataValues,
        id: result.dataValues.id,
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  updateNote: async (req, res) => {
    const data = {
      name: req.body.name,
      description: req.body.description,
    };

    try {
      await Note.update(data, {
        where: {
          id: req.params.noteId,
        },
      });
      res.json({
        message: 'success',
        data,
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  deleteNote: async (req, res) => {
    try {
      await Note.destroy({
        where: {
          id: req.params.noteId,
        },
      });
      res.json({ message: 'deleted', changes: this.changes });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
};

export default notesController;
