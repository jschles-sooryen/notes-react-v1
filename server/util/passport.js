/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/indent */
import passport from "passport";
import mongoose from "mongoose";
import GoogleTokenStrategy from "./strategy";
import User from "../models/User";
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
        await User.findOne(
          {
            "googleProvider.id": profile.id,
          },
          (err, user) => {
            // no user was found, lets create a new one
            if (!user) {
              const newUser = new User({
                email: profile.emails[0].value,
                fullName: profile.displayName,
                googleProvider: {
                  id: profile.id,
                  token: accessToken,
                },
              });

              newUser.save((error, savedUser) => {
                if (error) {
                  console.log(error);
                }
                mongoose.connection.close();
                return done(error, savedUser);
              });
            } else {
              mongoose.connection.close();
              return done(err, user);
            }
          }
        ).clone();
      }
    )
  );
};

export default passportInit;
