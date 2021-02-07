
import Matter from 'matter-js';

const UpdateRocket = (entities: { physics: { engine: any }, Rocket: { body: { position: { y: any } } } }, {
  touches,
  time,
}: any) => {
  const engine = entities.physics.engine;

  touches
    .filter((t: { type: string }) => t.type === 'move' || t.type === 'press')
    .forEach((t: { event: { pageX: any } }) => {
      // @ts-ignore
      Matter.Body.setPosition(entities.Rocket.body, {
        x: t.event.pageX,
        y: entities.Rocket.body.position.y,
      });
    });
  Matter.Engine.update(engine, time.delta);
  
  return entities;
};

export default UpdateRocket;
