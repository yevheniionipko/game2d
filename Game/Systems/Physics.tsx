import Matter from 'matter-js';

const Physics = (entities: { physics: { engine: any } }, { time, dispatch }: any) => {
  const engine = entities.physics.engine;

  Matter.Engine.update(engine, time.delta);
  Matter.Events.on(engine, 'collisionStart', () => {
    dispatch({ type: 'gameOver' });
  });
  
  return entities;
};

export default Physics;
