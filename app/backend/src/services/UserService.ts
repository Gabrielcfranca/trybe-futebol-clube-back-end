import * as bcrypt from 'bcryptjs';
import { ILogin } from '../interfaces/ILogin';
import IUser from '../interfaces/IUser';
import UserModel from '../database/models/UserModel';
import HttpError from '../errors/httpError';

export default class UserService {
  private _model = UserModel;
  // constructor(private _model: UserModel) {
  //   this._model = new UserModel();
  // }

  private findByEmail = async (email: string): Promise<IUser | null> => {
    const result = await this._model.findOne({
      where: { email },
    });
    // console.log(result, 'log do result');
    return result;
  };

  private validateEmail = async (email: string): Promise<IUser> => {
    const result = await this.findByEmail(email);
    if (!result) throw new HttpError('Incorrect email or password', 401);
    return result;
  };

  public login = async (data: ILogin): Promise<void> => {
    const { email, password } = data;
    const validateEmail = await this.validateEmail(email);
    const passVerify = bcrypt.compareSync(password, validateEmail.password);

    if (!passVerify) throw new HttpError('Incorrect email or password', 401);
  };

  public role = async (email: string): Promise<{ role: string }> => {
    const roleEmail = await this.findByEmail(email);
    const { role } = roleEmail as IUser;

    return { role };
  };
}
