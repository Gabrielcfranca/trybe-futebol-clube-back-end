import { ILogin } from './ILogin';

export default interface IUser extends ILogin {
  id?: number,
  username: string,
  role: string,
}
