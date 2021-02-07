
import Matter from 'matter-js';

const UpdateRocket = (entities, {touches, time}) => {
  const engine = entities.physics.engine;

  touches
    .filter(t => t.type === 'move' || t.type === 'press')
    .forEach(t => {
      Matter.Body.setPosition(entities.Rocket.body, {
        x: t.event.pageX,
        y: entities.Rocket.body.position.y,
      });
    });
  Matter.Engine.update(engine, time.delta);
  return entities;
};

export default UpdateRocket;
