/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-useless-escape */
import mongoose, { Schema } from 'mongoose';

const { String, ObjectId } = Schema.Types;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  googleProvider: {
    type: {
      id: String,
      token: String,
    },
    select: false,
  },
  folders: [
    { type: ObjectId, ref: 'folders' },
  ],
});

userSchema.set('toJSON', { getters: true, virtuals: true });

userSchema.statics.upsertGoogleUser = function (accessToken, _refreshToken, profile, cb) {
  const that = this;
  return this.findOne({
    'googleProvider.id': profile.id,
  }, (err: any, user: any) => {
    // no user was found, lets create a new one
    if (!user) {
      const newUser = new that({
        fullName: profile.displayName,
        email: profile.emails[0].value,
        googleProvider: {
          id: profile.id,
          token: accessToken,
        },
      });

      newUser.save((error: any, savedUser: any) => {
        if (error) {
          console.log(error);
        }
        return cb(error, savedUser);
      });
    } else {
      return cb(err, user);
    }
  });
};

const User = mongoose.model('users', userSchema);

export default User;
