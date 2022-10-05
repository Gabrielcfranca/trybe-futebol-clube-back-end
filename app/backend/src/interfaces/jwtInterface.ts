import { Request } from 'express';

export interface IJwt {
  id?: number,
  email: string,
  password: string,
}

export interface TokenData {
  email: string,
  password: string,
}

export interface ReqData extends Request {
  data?: TokenData,
}
