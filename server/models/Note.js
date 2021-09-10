import { DataTypes } from 'sequelize';
import db from '../database';

const Note = db.define('notes', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  folderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Note;
