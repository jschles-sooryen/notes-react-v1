/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/indent */
import passport from "passport";
import mongoose from "mongoose";
import GoogleTokenStrategy from "./strategy";
import User from "../models/User";
import Folder from "../models/Folder";
import config from "./config";
import connectToDatabaseViaLamba from "./connectToDatabaseViaLamba";

const passportInit = () => {
  console.log("Loading Passport");
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
      },
      async (accessToken, refreshToken, profile, done) => {
        await connectToDatabaseViaLamba();
        try {
          const user = await User.findOne({
            "googleProvider.id": profile.id,
          }).clone();

          if (!user) {
            const newUser = await new User({
              email: profile.emails[0].value,
              fullName: profile.displayName,
              googleProvider: {
                id: profile.id,
                // token: accessToken, ??
              },
            });

            const savedUser = await newUser.save();

            console.log("savedUser", savedUser);

            const defaultFolder = await new Folder({
              name: "New Folder",
              user: savedUser._id,
            });

            await defaultFolder.save();

            await mongoose.connection.close();
            return done(null, savedUser, accessToken);
          }

          return done(null, user, accessToken);
        } catch (error) {
          return done(error, null, accessToken);
        }
      }
    )
  );
};

export default passportInit;
