import { JwtPayload, SignOptions } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { IJwt } from '../interfaces/jwtInterface';

const JWT_SECRET = 'senhaMisteriosa';
const JWT_OPTIONS: SignOptions = { algorithm: 'HS256', expiresIn: '1d' };

const createToken = (payload: IJwt) => {
  const token = jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
  return token;
};

const verifyToken = (token: string): JwtPayload => {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload as JwtPayload;
};

export { createToken, verifyToken };
