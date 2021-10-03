import Rocket from '../Components/Rocket';
import Matter from 'matter-js';
import Obstacle from '../Components/Obstacle';
import { getRandom } from '../Utils/random';
import { height, heightRatio, width } from "../Utils/styleSheet";

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

export default () => {

  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;

  world.gravity.y = 0.04;
  const boxSize = 50;

  setInterval(() => {
    world.gravity.y = world.gravity.y + 0.01;
    Matter.Engine.update(engine);
  }, 10000);

  return {
    physics: { engine: engine, world: world },
    Rocket: Rocket(
      world,
      { x: Math.floor(width / 1.9), y: height * 0.8 },
      { height: boxSize, width: boxSize },
    ),
    ...Array.from({ length: 5 }, (v, k) => k).reduce((acc, curr) => {
      // @ts-ignore
      const y = acc[`Obstacle${curr - 1}`]?.body?.position?.y;

      return {
        ...acc,
        ['Obstacle' + curr]:
          Obstacle(world, { y: y ? y - (200) : -100, x: getRandom(10, width - 10) }, { width: 40, height: 40 }),
      };
    }, {}),
  };
};
