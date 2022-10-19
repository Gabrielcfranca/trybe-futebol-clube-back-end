import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!:number;
  awayTeam!: number;
  awayTeamGoals!:number;
  inProgress!: number;
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
    type: BOOLEAN,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  timestamps: false,
  tableName: 'matches',
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
