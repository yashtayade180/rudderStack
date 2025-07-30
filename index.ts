import Fastify from 'fastify';
import eventRoutes from './src/routes/event';
import propertyRoutes from './src/routes/properties';
import trackingPlanRoutes from './src/routes/trackingPlans';
import { sequelize } from './src/models';

const fastify = Fastify({ logger: true });

fastify.register(eventRoutes);
fastify.register(propertyRoutes);
fastify.register(trackingPlanRoutes);

const start = async () => {
  try {
    await sequelize.sync();
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();