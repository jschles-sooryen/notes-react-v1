/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import Note from '../models/Note';

const notesController = {
  getNotes: async (req: Request, res: Response) => {
    try {
      const result = await Note.find({ folder: req.params.id });
      res.json({
        message: 'success',
        data: result,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
  createNote: async (req: Request, res: Response) => {
    const data = {
      name: req.body.name,
      description: req.body.description,
      folder: req.params.id,
    };

    try {
      const result = await new Note(data);
      await result.save();
      res.json({
        message: 'success',
        data: result,
        id: result._id,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
  updateNote: async (req: Request, res: Response) => {
    const data = {
      name: req.body.name,
      description: req.body.description,
    };

    try {
      await Note.findOneAndUpdate(
        { folder: req.params.id },
        data,
        { new: true },
      );
      res.json({
        message: 'success',
        data,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
  deleteNote: async (req: Request, res: Response) => {
    try {
      await Note.findByIdAndDelete(req.params.noteId);
      res.json({ message: 'deleted' });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
};

export default notesController;
