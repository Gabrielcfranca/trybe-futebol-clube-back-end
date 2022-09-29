import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class User extends Model {
  // public <campo>!: <tipo>;
  id!: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

User.init({
  // ... Campos
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  userName: {
    allowNull: false,
    type: STRING,
  },
  role: {
    allowNull: false,
    type: STRING,
  },
  email: {
    allowNull: false,
    type: STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: STRING,
  },

}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
//
export default User;
