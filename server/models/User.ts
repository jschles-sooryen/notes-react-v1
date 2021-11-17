import mongoose, { Schema } from 'mongoose';

const { String, ObjectId } = Schema.Types;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  folders: [
    { type: ObjectId, ref: 'folders' },
  ],
});

const User = mongoose.model('users', userSchema);

export default User;
