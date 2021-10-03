import Matter from 'matter-js';
import { getRandom } from '../Utils/random';
import { height, heightRatio, width } from "../Utils/styleSheet";
import Entities from '../Entities';

// @ts-ignore
const UpdateObstacle = (entities: typeof Entities, { dispatch }) => {
  const obstacles = Object.values(entities).filter(
    item => item.body && item.body.label === 'obstacle',
  );

  obstacles.forEach((item) => {
    if (item.body.position.y > height + 20) {
      Matter.Body.setPosition(item.body, {
        x: getRandom(10, width - 10),
        y: -(100 * heightRatio),
      });
      dispatch({ type: 'score' });
    }
    if (item.body.position.x > width || item.body.position.x < 0) {
      Matter.Body.setPosition(item.body, {
        x: getRandom(10, width - 10),
        y: item.body.position.y,
      });
    }
  });

  return entities;
};

export default UpdateObstacle;
