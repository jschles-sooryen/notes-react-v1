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
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passportInit from '../../util/passport';
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
app.use(bodyParser.json());
app.use(cookieParser());

const router = express.Router();

router.post(
  '/',
  passport.authenticate('google-token', { session: false, scope: ['email'] }),
  (req: any, res: any, next) => {
    console.log('cb req 2', req.authInfo);

    if (!req.user || !req.authInfo) {
      return res.status(401).send('User Not Authenticated');
    }

    req.auth = {
      id: req.user.id,
      accessToken: req.authInfo,
    };

    next();
  },
  (req: any, res: any) => {
    res.setHeader('x-auth-token', req.auth.accessToken);
    return res
      .status(200)
      .send(JSON.stringify(req.user));
  },
);

/* Attach routes to express instance */
// const functionName = 'auth';
// const routerBasePath = (process.env.NODE_ENV === 'development') ? `/${functionName}` : `/.netlify/functions/${functionName}/`;
app.use('/.netlify/functions/auth/', router);

/* Export lambda ready express app */
exports.handler = serverless(app);
