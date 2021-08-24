const { DataTypes } = require('sequelize');
const db = require('../database');
const Note = require('./Note');

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

module.exports = Folder;
