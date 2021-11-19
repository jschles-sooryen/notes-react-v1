/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/indent */
import passport from "passport";
import { Strategy as GoogleTokenStrategy } from "passport-token-google";
import User from "../models/User";
import config from "./config";

const passportInit = () => {
  console.log("Loading Passport");
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
      },
      (accessToken, refreshToken, profile, done) =>
        User.findOne(
          {
            "googleProvider.id": profile.id,
          },
          (err, user) => {
            // no user was found, lets create a new one
            if (!user) {
              const newUser = new User({
                email: profile.emails[0].value,
                googleProvider: {
                  id: profile.id,
                  token: accessToken,
                },
              });

              newUser.save((error, savedUser) => {
                if (error) {
                  console.log(error);
                }
                return done(error, savedUser);
              });
            } else {
              return done(err, user);
            }
          }
        )
    )
  );
};

export default passportInit;
