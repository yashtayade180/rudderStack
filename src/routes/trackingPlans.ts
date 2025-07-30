import { FastifyPluginAsync } from 'fastify';
import { Event, Property, TrackingPlan, EventTrackingPlan, PropertyEventTrackingPlan } from '../models';

const trackingPlanRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post('/tracking-plans', async (request, reply) => {
    const { name, description, events = [] } = request.body as any;

    if (!name || !description) {
        return reply.status(400).send({ error: 'Name and description are required.' });
    }

    try {
        const trackingPlan = await TrackingPlan.create({ name, description });

        for (const e of events) {
        const { name: eventName, type, description: eventDesc, properties = [], additionalProperties } = e;

        let event = await Event.findOne({ where: { name: eventName, type } });
        if (event && event.description !== eventDesc) {
            return reply.status(409).send({ error: `Event '${eventName}' description mismatch.` });
        }
        if (!event) {
            event = await Event.create({ name: eventName, type, description: eventDesc });
        }

        const eventPlan = await EventTrackingPlan.create({
            trackingPlanId: trackingPlan.id,
            eventId: event.id,
            additionalProps: additionalProperties,
        });

        for (const prop of properties) {
            const { name: propName, type: propType, description: propDesc, required } = prop;

            let property = await Property.findOne({ where: { name: propName, type: propType } });
            if (property && property.description !== propDesc) {
            return reply.status(409).send({ error: `Property '${propName}' description mismatch.` });
            }
            if (!property) {
            property = await Property.create({ name: propName, type: propType, description: propDesc });
            }

            await PropertyEventTrackingPlan.create({
            eventTrackingPlanId: eventPlan.id,
            propertyId: property.id,
            required,
            });
        }
        }

        reply.code(201).send({ message: 'Tracking plan created' });
    } catch (err: any) {
        reply.status(500).send({ error: err.message });
    }
    });

    fastify.get('/tracking-plans', async (request, reply) => {
    try {
        const plans = await TrackingPlan.findAll({
        include: [{ all: true, nested: true }]
        });
        reply.send(plans);
    } catch (err: any) {
        reply.status(500).send({ error: err.message });
    }
    });

    fastify.get('/tracking-plans/:id', async (request, reply) => {
        const { id } = request.params as any;
        
        try {
            const plan = await TrackingPlan.findByPk(id, {
            include: [{ all: true, nested: true }],
            });
        
            if (!plan) {
            return reply.status(404).send({ error: 'Tracking plan not found' });
            }
        
            reply.send(plan);
        } catch (err: any) {
            reply.status(500).send({ error: err.message });
        }
    });

    fastify.get('/tracking-plans/:id/events', async (request, reply) => {
        const { id } = request.params as any;
    
        try {
        const trackingPlan = await TrackingPlan.findByPk(id, {
            include: [
            {
                model: Event,
                as: 'events',
                through: { attributes: [] },
            },
            ],
        });
    
        if (!trackingPlan) {
            return reply.status(404).send({ error: 'Tracking plan not found' });
        }
    
        reply.send(trackingPlan.events);
        } catch (err: any) {
        reply.status(500).send({ error: err.message });
        }
    });
};

export default trackingPlanRoutes;