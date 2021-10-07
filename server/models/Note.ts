// import { DataTypes, Model, Optional } from 'sequelize';
// import db from '../database';

// interface NoteAttributes {
//   id: number;
//   name: string;
//   description: string;
//   folderId: number;
// }

// interface NoteCreationAttributes extends Optional<NoteAttributes, 'id'> {}

// interface NoteInstance
//   extends Model<NoteAttributes, NoteCreationAttributes>,
//     NoteAttributes {}

// const Note = db.define<NoteInstance>('notes', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   folderId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// });

// export default Note;
export default {};
