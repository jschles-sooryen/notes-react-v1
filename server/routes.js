const express = require('express');
const notesController = require('./controllers/notesController');
const foldersController = require('./controllers/foldersController');

const router = express.Router();

router.get('/api/folders', foldersController.getFolders);
router.post('/api/folders', foldersController.createFolder);
router.patch('/api/folders/:id', foldersController.updateFolder);
router.delete('/api/folders/:id', foldersController.deleteFolder);

router.get('/api/folders/:id/notes', notesController.getNotes);
router.post('/api/folders/:id/notes', notesController.createNote);
router.patch('/api/folders/:id/notes/:noteId', notesController.updateNote);
router.delete('/api/folders/:id/notes/:noteId', notesController.deleteNote);

// Default response for any other request
router.use((req, res) => res.status(404));
