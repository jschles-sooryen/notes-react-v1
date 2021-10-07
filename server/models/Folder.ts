// import { DataTypes, Model, Optional } from 'sequelize';
// import db from '../database';
// import Note from './Note';

// interface FolderAttributes {
//   id: number;
//   name: string;
// }

// interface FolderCreationAttributes extends Optional<FolderAttributes, 'id'> {}

// interface FolderInstance
//   extends Model<FolderAttributes, FolderCreationAttributes>,
//     FolderAttributes {}

// const Folder = db.define<FolderInstance>('folders', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// Folder.hasMany(Note, { foreignKey: 'folderId' });

// export default Folder;
export default {};
