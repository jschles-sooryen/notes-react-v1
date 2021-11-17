/* eslint-disable @typescript-eslint/indent */
/* eslint-disable import/prefer-default-export */
// import { Handler } from '@netlify/functions';

// const handler: Handler = async (event) => ({
//   statusCode: 200,
//   headers: {
//     'Content-Type': 'text/plain',
//   },
//   body: 'Hello There!',
// });

// export { handler };

// const express = require('express')
// const cors = require('cors')
// const bodyParser = require('body-parser')
// const compression = require('compression')
// const morgan = require('morgan')
// const serverless = require('serverless-http')
// const customLogger = require('./utils/logger')
// const auth0CheckAuth = require('./utils/auth0')
import express from 'express';
import serverless from 'serverless-http';
import passport from 'passport';
import cors from 'cors';
import passportJwt from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { sign } from 'jsonwebtoken';
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: `${process.env.REACT_APP_API_SERVER}/auth/callback`,
},
  (accessToken, refreshToken, profile, done) => {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    console.log('Google Auth Request');
    console.log({ accessToken });
    console.log({ refreshToken });
    console.log({ profile });

    return done(profile);
  }));

// passport.use(
//   new passportJwt.Strategy({
//     jwtFromRequest(req) {
//       if (!req.cookies) throw new Error(`Missing cookie-parser middleware`);
//       return req.cookies.jwt;
//     },
//     secretOrKey: SECRET,
//   },
//     async ({ user: { email } }, done) => {
//       try {
//         // Here you'd typically load an existing user
//         // and use their data to create the JWT.
//         const jwt = authJwt(email);

//         return done(null, { email, jwt });
//       } catch (error) {
//         return done(error);
//       }
//     }),
// );

/* initialize express */
const app = express();

app.use(passport.initialize());
app.use(cors());

const router = express.Router();

/*  gzip responses */
// router.use(compression())

/* Setup protected routes */
// router.get('/', (req, res) => {
//   console.log('Auth Request');
//   res.json({
//     message: 'Authenticate Request',
//   });
// });

router.get('/', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile'] }));

router.get('/callback', (req, res) => {
  console.log('Callback req', req);
  res.json({
    message: 'Callback',
  });
});

/* Attach request logger for AWS */
// app.use(morgan(customLogger))

/* Attach routes to express instance */
const functionName = 'auth';
// const routerBasePath = (process.env.NODE_ENV === 'development') ? `/${functionName}` : `/.netlify/functions/${functionName}/`;
app.use(`/.netlify/functions/${functionName}/`, router);

/* Apply express middlewares */
// router.use(cors())
// router.use(bodyParser.json())
// router.use(bodyParser.urlencoded({ extended: true }))

/* Export lambda ready express app */
exports.handler = serverless(app);