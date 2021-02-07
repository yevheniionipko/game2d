import Rocket from '../Components/Rocket';
import Matter from 'matter-js';
import Floor from '../Components/Floor';
import Ceiling from '../Components/Ceiling';
import Obstacle from '../Components/Obstacle';
import {getRandom, topObstacleHeight, bottomObstacleHeight} from '../Utils/random';
import Constants from '../Utils/Constants';
import { height, width } from '../Utils/styleSheet';

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

export default () => {

  let engine = Matter.Engine.create({enableSleeping: false});
  let world = engine.world;
  world.gravity.y = 0.04
  const boxSize = 50;
  setInterval(() => {
    world.gravity.y = world.gravity.y + 0.01
    Matter.Engine.update(engine);
  }, 10000)

  return {
    physics: {engine: engine, world: world},
    Rocket: Rocket(
      world,
      {x: Math.floor(375 / 2) + 24, y: height - 200},
      {height: boxSize, width: boxSize},
    ),
    ...Array.from({ length: 5 }, (v, k) => k).reduce((acc, curr) => {
      const y = acc[`Obstacle${curr - 1}`]?.body?.position?.y;
      return {...acc, ['Obstacle' + curr]: Obstacle(world, { y: y ? y - 200 : -100, x: getRandom(10, 365) }, { width: 40, height: 40 }),}
    }, {}),
  };
};
