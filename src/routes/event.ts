import { FastifyPluginAsync } from 'fastify';
import { Event } from '../models';

const eventRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/events', async (request, reply) => {
    const { name, type, description } = request.body as any;
    const allowedTypes = ['track', 'identify', 'alias', 'screen', 'page'];

    if (!allowedTypes.includes(type)) {
      return reply.status(400).send({ error: 'Invalid event type' });
    }

    try {
      const existing = await Event.findOne({ where: { name, type } });
      if (existing) {
        if (existing?.description !== description) {
          return reply.status(409).send({ error: 'Event description mismatch' });
        }
        return reply.send(existing);
      }

      const event = await Event.create({ name, type, description });
      reply.code(201).send(event);
    } catch (err:any) {
      reply.status(500).send({ error: err.message });
    }
  });

  fastify.get('/events', async (request, reply) => {
    try {
      const events = await Event.findAll();
      reply.send(events);
    } catch (err: any) {
      reply.status(500).send({ error: err.message });
    }
  });
};

export default eventRoutes;