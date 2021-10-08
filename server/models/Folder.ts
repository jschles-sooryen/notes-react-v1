import mongoose, { Schema } from 'mongoose';

const { String, ObjectId } = Schema.Types;

const folderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  notes: [
    { type: ObjectId, ref: 'notes' },
  ],
});

const Folder = mongoose.model('folders', folderSchema);

export default Folder;
