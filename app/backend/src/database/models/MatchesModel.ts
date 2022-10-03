import { INTEGER, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';
// import OtherModel from './OtherModel';

class Match extends Model {
  // public <campo>!: <tipo>;
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!:number;
  public awayTeam!: number;
  public awayTeamGoals!:number;
  public inProgress!: number;
}

Match.init({
  // ... Campos
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: INTEGER,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */
Match.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

TeamModel.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamHome' });
TeamModel.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
