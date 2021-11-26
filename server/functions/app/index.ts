/* eslint-disable consistent-return */
/* eslint-disable array-bracket-spacing */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable import/prefer-default-export */
import express from 'express';
import serverless from 'serverless-http';
import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import passportInit from '../../util/passport';
import foldersController from '../../controllers/foldersController';

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
  '/auth',
  passport.authenticate('google-token', { session: true, scope: ['email'] }),
  (req: any, res: any, next) => {
    console.log('/AUTH');
    mongoose.connection.close();

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

router.get('/folders', passport.authenticate('google-token', { session: true, scope: ['email'] }), foldersController.getFolders);
router.post('/folders', passport.authenticate('google-token', { session: true, scope: ['email'] }), foldersController.createFolder);
router.patch('/folders', passport.authenticate('google-token', { session: true, scope: ['email'] }), foldersController.updateFolder);
router.delete('/folders', passport.authenticate('google-token', { session: true, scope: ['email'] }), foldersController.deleteFolder);

/* Attach routes to express instance */
// const functionName = 'auth';
// const routerBasePath = (process.env.NODE_ENV === 'development') ? `/${functionName}` : `/.netlify/functions/${functionName}/`;
app.use('/.netlify/functions/app/', router);

/* Export lambda ready express app */
exports.handler = serverless(app);
