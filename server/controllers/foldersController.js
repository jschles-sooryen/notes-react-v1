// const Folder = require('../models/Folder');
import Folder from '../models/Folder';

const foldersController = {
  getFolders: async (req, res) => {
    try {
      const results = await Folder.findAll();
      res.json({
        message: 'success',
        data: results,
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  createFolder: async (req, res) => {
    try {
      const result = await Folder.create({ name: req.body.name });
      res.json({
        message: 'success',
        data: result.dataValues,
        id: result.dataValues.id,
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  updateFolder: async (req, res) => {
    const data = {
      name: req.body.name,
    };
    try {
      await Folder.update(data, {
        where: {
          id: req.params.id,
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
  deleteFolder: async (req, res) => {
    try {
      await Folder.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.json({ message: 'deleted', changes: this.changes });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
};

export default foldersController;
