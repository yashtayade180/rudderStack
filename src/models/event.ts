import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

export class Event extends Model {
  public id!: number;
  public name!: string;
  public type!: string;
  public description!: string;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false,
  }
);

export default Event;
