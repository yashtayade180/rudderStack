import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';
import { Event } from './event';

interface TrackingPlanAttributes {
  id: number;
  name: string;
  description?: string;
}

type TrackingPlanCreationAttributes = Optional<TrackingPlanAttributes, 'id'>;

class TrackingPlan extends Model<TrackingPlanAttributes, TrackingPlanCreationAttributes>
  implements TrackingPlanAttributes {
  public id!: number;
  public name!: string;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public events?: Event[];
}

TrackingPlan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'TrackingPlan',
    tableName: 'tracking_plans',
    timestamps: true,
  }
);

export default TrackingPlan;
