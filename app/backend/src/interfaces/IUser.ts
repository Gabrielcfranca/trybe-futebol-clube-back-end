import { ILogin } from './ILogin';

export interface IRole {
  role: string
}
export default interface IUser extends ILogin {
  id?: number,
  username: string,
  role: string,
}
