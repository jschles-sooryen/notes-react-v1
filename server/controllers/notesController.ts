/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Note from '../models/Note';
import connectToDatabaseViaLamba from '../util/connectToDatabaseViaLamba';

const notesController = {
  getNotes: async (req: Request, res: Response) => {
    await connectToDatabaseViaLamba();
    try {
      const result = await Note.find({ folder: req.params.id });
      res.json({
        message: 'success',
        data: result,
      });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
    mongoose.connection.close();
  },
  createNote: async (req: Request, res: Response) => {
    await connectToDatabaseViaLamba();
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
    mongoose.connection.close();
  },
  updateNote: async (req: Request, res: Response) => {
    await connectToDatabaseViaLamba();
    const data = {
      name: req.body.name,
      description: req.body.description,
    };

    try {
      await Note.findOneAndUpdate(
        { folder: req.body.id },
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
    mongoose.connection.close();
  },
  deleteNote: async (req: Request, res: Response) => {
    await connectToDatabaseViaLamba();
    try {
      await Note.findByIdAndDelete(req.body.noteId);
      res.json({ message: 'deleted' });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
    mongoose.connection.close();
  },
};

export default notesController;
