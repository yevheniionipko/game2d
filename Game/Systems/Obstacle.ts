import Matter from 'matter-js';
import {getRandom} from '../Utils/random';
import { width } from "../Utils/styleSheet";

const UpdateObstacle = (entities, {time, dispatch}) => {
  const obstacles = Object.values(entities).filter(
    item => item.body && item.body.label === 'obstacle'
  );

  obstacles.forEach((item) => {
    if (item.body.position.y > 1000) {
      Matter.Body.setPosition(item.body, {
        x: getRandom(20, width - 20),
        y: -100,
      });
      dispatch({type: 'score'})
    }
    if (item.body.position.x > width || item.body.position.x < 0) {
        Matter.Body.setPosition(item.body, {
          x: getRandom(0, width - 30),
          y: item.body.position.y,
        });
    }
  });

  return entities;
};

export default UpdateObstacle;
