import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index';

interface PropertyAttributes {
  id: number;
  name: string;
  type: 'string' | 'number' | 'boolean';
  description?: string;
  validation?: object;
}

type PropertyCreationAttributes = Optional<PropertyAttributes, 'id'>;

export class Property extends Model<PropertyAttributes, PropertyCreationAttributes>
  implements PropertyAttributes {
  public id!: number;
  public name!: string;
  public type!: 'string' | 'number' | 'boolean';
  public description?: string;
  public validation?: object;
}

Property.init(
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
      type: DataTypes.ENUM('string', 'number', 'boolean'),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    validation: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    modelName: 'Property',
    tableName: 'properties',
    indexes: [{ unique: true, fields: ['name', 'type'] }],
    timestamps: true,
  }
);

export default Property;
