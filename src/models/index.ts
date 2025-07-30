// import { Sequelize } from 'sequelize';

// export const sequelize = new Sequelize(process.env.DATABASE_URL || '');

// import Event from './event';
// import Property from './property';
// import TrackingPlan from './trackingPlan';
// import EventTrackingPlan from './eventTrackingPlan';
// import PropertyEventTrackingPlan from './propertyEventTrackingPlan';

// Event.belongsToMany(TrackingPlan, { through: EventTrackingPlan });
// TrackingPlan.belongsToMany(Event, { through: EventTrackingPlan });

// EventTrackingPlan.belongsToMany(Property, { through: PropertyEventTrackingPlan });
// Property.belongsToMany(EventTrackingPlan, { through: PropertyEventTrackingPlan });

// TrackingPlan.belongsToMany(Event, {
//     through: EventTrackingPlan,
//     foreignKey: 'trackingPlanId',
//     otherKey: 'eventId',
//     as: 'events',
// });

// Event.belongsToMany(TrackingPlan, {
//     through: EventTrackingPlan,
//     foreignKey: 'eventId',
//     otherKey: 'trackingPlanId',
//     as: 'trackingPlans',
// });

// export { Event, Property, TrackingPlan, EventTrackingPlan, PropertyEventTrackingPlan };

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'postgres',
  logging: false,
});

import Event from './event';
import Property from './property';
import TrackingPlan from './trackingPlan';
import EventTrackingPlan from './eventTrackingPlan';
import PropertyEventTrackingPlan from './propertyEventTrackingPlan';

TrackingPlan.belongsToMany(Event, {
  through: EventTrackingPlan,
  foreignKey: 'trackingPlanId',
  otherKey: 'eventId',
  as: 'events',
});

Event.belongsToMany(TrackingPlan, {
  through: EventTrackingPlan,
  foreignKey: 'eventId',
  otherKey: 'trackingPlanId',
  as: 'trackingPlans',
});

EventTrackingPlan.belongsToMany(Property, {
  through: PropertyEventTrackingPlan,
  foreignKey: 'eventTrackingPlanId',
  otherKey: 'propertyId',
  as: 'properties',
});

Property.belongsToMany(EventTrackingPlan, {
  through: PropertyEventTrackingPlan,
  foreignKey: 'propertyId',
  otherKey: 'eventTrackingPlanId',
  as: 'eventTrackingPlans',
});

export { Event, Property, TrackingPlan, EventTrackingPlan, PropertyEventTrackingPlan };
