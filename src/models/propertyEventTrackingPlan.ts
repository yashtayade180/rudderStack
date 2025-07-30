import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

class PropertyEventTrackingPlan extends Model {}

PropertyEventTrackingPlan.init({
  eventTrackingPlanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'eventTrackingPlans',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  propertyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'properties',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  required: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'PropertyEventTrackingPlan',
  tableName: 'propertyEventTrackingPlans',
  timestamps: true,
});

export default PropertyEventTrackingPlan;
