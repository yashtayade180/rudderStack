import { FastifyPluginAsync } from 'fastify';
import { Property } from '../models';

const propertyRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/properties', async (request, reply) => {
    const { name, type, description, validation } = request.body as any;
    const allowedTypes = ['string', 'number', 'boolean'];

    if (!allowedTypes.includes(type)) {
      return reply.status(400).send({ error: 'Invalid property type' });
    }

    try {
      const existing = await Property.findOne({ where: { name, type } });
      if (existing) {
        if (existing.description !== description) {
          return reply.status(409).send({ error: 'Property description mismatch' });
        }
        return reply.send(existing);
      }

      const property = await Property.create({ name, type, description, validation });
      reply.code(201).send(property);
    } catch (err:any) {
      reply.status(500).send({ error: err.message });
    }
  });

  fastify.get('/properties', async (request, reply) => {
    try {
      const props = await Property.findAll();
      reply.send(props);
    } catch (err: any) {
      reply.status(500).send({ error: err.message });
    }
  });

  
};

export default propertyRoutes;