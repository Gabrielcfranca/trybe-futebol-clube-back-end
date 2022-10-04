import { JwtPayload, SignOptions } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { IJwt } from '../interfaces/jwtInterface';

const JWT_SECRET = 'validateToken';
const JWT_OPTIONS: SignOptions = { algorithm: 'HS256', expiresIn: '1d' };

const createToken = (payload: IJwt) => {
  const token = jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
  return token;
};

const verifyToken = (token: string): string => {
  const payload = jwt.verify(token, JWT_SECRET);
  console.log(payload, 'log do payload');
  return payload as string;
};

export { createToken, verifyToken };
