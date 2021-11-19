/* eslint-disable consistent-return */
/* eslint-disable array-bracket-spacing */
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
import cookieParser from 'cookie-parser';
import passportInit from '../../util/passport';
import tokenUtils from '../../util/jwtToken';
// import passportJwt from 'passport-jwt';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
// import { sign } from 'jsonwebtoken';
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passportInit();

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};

/* initialize express */
const app = express();

app.use(passport.initialize());
app.use(cors(corsOption));
app.use(cookieParser());

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

// router.get('/', passport.authenticate('google', { scope: [/* 'https://www.googleapis.com/auth/userinfo.profile' */ 'profile', 'email'] }));

// router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//   console.log('Callback');
//   res.redirect('/');
// });

router.post(
  // '/callback',
  '/',
  passport.authenticate('google-token', { session: false }),
  (req: any, res: any, next) => {
    if (!req.user) {
      return res.status(401).send('User Not Authenticated');
    }

    req.auth = {
      id: req.user.id,
    };

    next();
  },
  tokenUtils.generateToken,
  tokenUtils.sendToken,
);

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
