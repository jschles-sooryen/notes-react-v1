import { DataTypes } from 'sequelize';
import db from '../database';
import Note from './Note';

const Folder = db.define('folders', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Folder.hasMany(Note, { foreignKey: 'folderId' });

export default Folder;
