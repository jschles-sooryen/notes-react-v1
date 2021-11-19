import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from './config';

const secret = config.jwtSecret as string;

const createToken = (auth: any) => jwt.sign({ id: auth.id }, secret, { expiresIn: 60 * 120 });

export default {
  generateToken: (req: any, res: any, next: NextFunction) => {
    req.token = createToken(req.auth);
    return next();
  },
  sendToken: (req: any, res: any) => {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
  },
};
