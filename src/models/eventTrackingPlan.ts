import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';

interface EventTrackingPlanAttributes {
  id: number;
  trackingPlanId: number;
  eventId: number;
  additionalProps: boolean;
}

type EventTrackingPlanCreationAttributes = Optional<EventTrackingPlanAttributes, 'id'>;

class EventTrackingPlan extends Model<EventTrackingPlanAttributes, EventTrackingPlanCreationAttributes>
  implements EventTrackingPlanAttributes {
  public id!: number;
  public trackingPlanId!: number;
  public eventId!: number;
  public additionalProps!: boolean;
}

EventTrackingPlan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    trackingPlanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    additionalProps: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'EventTrackingPlan',
    tableName: 'event_tracking_plans',
    timestamps: true,
  }
);

export default EventTrackingPlan;
